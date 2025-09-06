"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";
import { Decimal } from "@prisma/client/runtime/library";
import z from "zod";
import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";
import {
  registrationSchema,
  type RegistrationFormData,
} from "@/schemas/signupUserSchema";
import {
  OrgRegistrationFormData,
  orgRegistrationSchema,
} from "@/schemas/signupOrgSchema";
import { AUTHORIZED_REDIRECTION } from "@/data/routes";
import { UserType } from "@prisma/client";
import { StorageHelpers } from "@/services/supabase-storage";
import { BUCKETS } from "@/types/Statics";
import { OrganizationService } from "@/services/organizations";
import { getCallingCodeFromCountry, mimeTypeToExtension } from "@/lib/utils";
import path from "path";
import { UserProfile, validateUserProfile } from "@/schemas";
import { UserService } from "@/services/user";

export type ProfileState = {
  success?: boolean;
  message?: string;
  error?: string;
  errors?: Partial<Record<keyof RegistrationFormData, string[]>>;
};

export async function updateUserProfileAction(
  data: UserProfile
): Promise<ProfileState> {
  try {
    // Just in case
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session || !session.user) {
      return {
        success: false,
        error: "يجب تسجيل الدخول لتحديث بياناتك الشخصية",
      };
    }

    validateUserProfile(data);

    const userId = session.user.id;
    let imageUrl: string | undefined;

    // Handle image upload if provided
    if (data.image && typeof data.image === "string" && data.image.length > 0) {
      try {
        const { base64, name, type } = JSON.parse(data.image);

        const fileBuffer = Buffer.from(base64, "base64");
        let ext = path.extname(name);
        if (!ext && type) {
          ext = mimeTypeToExtension(type) || ".bin";
        }

        const fileName = `${uuidv4()}.${name
          .replace(/\s+/g, "-")
          .replace(ext, "")}${ext}`;

        const filePath = `${userId}/${fileName}`;
        const storage = new StorageHelpers();

        const result = await storage.uploadFile(
          "avatars",
          filePath,
          fileBuffer,
          type
        );

        imageUrl = result.path;
      } catch (error) {
        console.error("Error uploading profile image:", error);
        return {
          success: false,
          error: "حدث خطأ أثناء رفع الصورة الشخصية، يرجى المحاولة مرة أخرى",
        };
      }
    }

    const formattedPhone = data.phone
      ? data.phoneCountryCode
        ? `+${getCallingCodeFromCountry(data.phoneCountryCode)} ${data.phone}`
        : "+213 " + data.phone
      : undefined;

    // Update user record
    await prisma.user.update({
      where: { id: userId },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: formattedPhone,
        city: data.city,
        state: data.state,
        country: data.country,
        bio: data.bio || null,
        image: imageUrl || undefined, // Only update if new image was uploaded
        latitude: data.latitude ? new Decimal(data.latitude) : null,
        longitude: data.longitude ? new Decimal(data.longitude) : null,
        updatedAt: new Date(),
      },
    });

    // Update qualifications record
    if (data.qualifications) {
      const existingQualification = await prisma.userQualification.findFirst({
        where: { userId },
      });

      if (existingQualification) {
        await prisma.userQualification.update({
          where: { id: existingQualification.id },
          data: {
            specification: data.qualifications.specification,
            educationalLevel: data.qualifications.educationalLevel,
            currentJob: data.qualifications.currentJob || "",
            updatedAt: new Date(),
          },
        });
      } else {
        await prisma.userQualification.create({
          data: {
            userId,
            specification: data.qualifications.specification,
            educationalLevel: data.qualifications.educationalLevel,
            currentJob: data.qualifications.currentJob || "",
          },
        });
      }
    }

    // Revalidate the profile page to reflect the changes
    revalidatePath("/profile");

    return {
      success: true,
      message: "تم تحديث البيانات الشخصية بنجاح",
    };
  } catch (error) {
    console.error("Error updating user profile:", error);
    if (error instanceof z.ZodError) {
      const treeError = z.treeifyError(error);
      const fieldErrors: Partial<Record<keyof UserProfile, string[]>> = {};

      if (typeof treeError === "object" && treeError !== null) {
        for (const [field, fieldError] of Object.entries(treeError)) {
          if (
            field !== "formErrors" &&
            typeof fieldError === "object" &&
            fieldError !== null &&
            "errors" in fieldError
          ) {
            fieldErrors[field as keyof UserProfile] = (
              fieldError as { errors: string[] }
            ).errors;
          }
        }
      }
      return {
        success: false,
        errors: fieldErrors,
      };
    }
    return {
      success: false,
      error: "حدث خطأ أثناء تحديث البيانات الشخصية، يرجى المحاولة مرة أخرى",
    };
  }
}

export async function completeProfileAction(
  data: RegistrationFormData
): Promise<ProfileState> {
  try {
    // Get current session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        error: "يجب تسجيل الدخول أولاً",
      };
    }

    const validatedData = registrationSchema.parse(data);

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        // Personal Information (Step 1)
        dateOfBirth: new Date(validatedData.dateOfBirth),
        sex: validatedData.sex,
        phone: validatedData.phone,
        city: validatedData.city,
        state: validatedData.state,
        country: validatedData.country,
        latitude: validatedData.latitude
          ? new Decimal(validatedData.latitude)
          : null,
        longitude: validatedData.longitude
          ? new Decimal(validatedData.longitude)
          : null,

        // Bio and user type
        bio: validatedData.bio,
        userType: validatedData.userType,

        // Profile completion flag
        profileCompleted: true,
        updatedAt: new Date(),
      },
    });

    // Create or update UserQualification record
    const existingQualification = await prisma.userQualification.findFirst({
      where: { userId: session.user.id },
    });

    if (existingQualification) {
      await prisma.userQualification.update({
        where: { id: existingQualification.id },
        data: {
          specification: validatedData.specification,
          educationalLevel: validatedData.educationalLevel,
          currentJob: validatedData.currentJob || "",
          updatedAt: new Date(),
        },
      });
    } else {
      await prisma.userQualification.create({
        data: {
          userId: session.user.id,
          specification: validatedData.specification,
          educationalLevel: validatedData.educationalLevel,
          currentJob: validatedData.currentJob || "",
        },
      });
    }

    // Success response - no redirect here, let the component handle it
    return {
      success: true,
      message: "تم إكمال الملف الشخصي بنجاح",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const treeError = z.treeifyError(error);
      // Convert the tree structure to field errors format
      const fieldErrors: Partial<Record<keyof RegistrationFormData, string[]>> =
        {};

      // Extract field-specific errors from the tree structure
      if (typeof treeError === "object" && treeError !== null) {
        for (const [field, fieldError] of Object.entries(treeError)) {
          if (
            field !== "formErrors" &&
            typeof fieldError === "object" &&
            fieldError !== null &&
            "errors" in fieldError
          ) {
            fieldErrors[field as keyof RegistrationFormData] = (
              fieldError as { errors: string[] }
            ).errors;
          }
        }
      }

      return {
        success: false,
        errors: fieldErrors,
      };
    }

    console.error("Profile completion error:", error);
    return {
      success: false,
      error: "حدث خطأ أثناء حفظ البيانات. يرجى المحاولة مرة أخرى",
    };
  }
}

export async function completeOrgProfileAction(
  data: OrgRegistrationFormData
): Promise<ProfileState> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session || !session.user) {
      return {
        success: false,
        error: "يجب تسجيل الدخول لإكمال تسجيل المنظمة",
      };
    }

    // validate the data on server just in case, the front validation is working
    orgRegistrationSchema.parse(data);
    const userId = session.user.id;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uploadPromises: Promise<any>[] = [];
    const fileFields = ["officialLicense", "logo", "identificationCard"];

    for (const field of fileFields) {
      const fileValue = data[field as keyof typeof data];
      if (typeof fileValue === "string" && fileValue.length > 0) {
        const { base64, name, type } = JSON.parse(fileValue);

        const fileBuffer = Buffer.from(base64, "base64");
        let ext = path.extname(name);
        if (!ext && type) {
          ext = mimeTypeToExtension(type) || ".bin";
        }

        const fileName = `${uuidv4()}.${name
          .replace(/\s+/g, "-")
          .replace(ext, "")}${ext}`;
        const bucketName: BUCKETS = field === "logo" ? "avatars" : "documents";

        const filePath = `${userId}/${fileName}`;

        const storage = new StorageHelpers();
        const uploadPromise = storage
          .uploadFile(bucketName, filePath, fileBuffer, type) // Pass type here if supported
          .then((result) => ({
            field,
            url: result.path,
          }))
          .catch((error) => {
            console.error(`Error uploading ${field}:`, error);
            throw new Error(`Failed to upload ${field}: ${error.message}`);
          });

        uploadPromises.push(uploadPromise);
      }
    }
    const uploadResults = await Promise.all(uploadPromises);

    const uploadedUrls: Record<string, string> = {};
    uploadResults.forEach(({ field, url }) => {
      uploadedUrls[field] = url;
    });

    const processedFormData = {
      ...data,
      ...uploadedUrls,
    };

    const formattedPhone = processedFormData.contactPhone
      ? `+${getCallingCodeFromCountry(
          processedFormData.contactPhoneCountryCode
        )} ${processedFormData.contactPhone}`
      : undefined;

    const formattedPhoneOrg = processedFormData.contactPhoneOrg
      ? `+${getCallingCodeFromCountry(
          processedFormData.contactPhoneOrgCountryCode
        )} ${processedFormData.contactPhoneOrg}`
      : undefined;

    const organization = await prisma.organization.upsert({
      where: { userId },
      update: {
        name: processedFormData.officialName,
        shortName: processedFormData.shortName || undefined,
        description: processedFormData.shortDescription || undefined,
        contactEmail: processedFormData.contactEmail,
        contactPhone: formattedPhoneOrg,
        foundingDate: processedFormData.foundingDate || undefined,
        membersCount: processedFormData.membersCount || undefined,
        headquarters: processedFormData.headquarters || undefined,
        logo: processedFormData.logo || undefined,
        website: undefined,
        socialLinks: {},
        city: processedFormData.city || undefined,
        state: processedFormData.state,
        country: processedFormData.country,
        organizationType: processedFormData.organizationType,
        workAreas: processedFormData.workAreas,
        previousInitiatives: processedFormData.previousInitiatives || undefined,
        officialLicense: processedFormData.officialLicense || undefined,
        identificationCard: processedFormData.identificationCard || undefined,
        updatedAt: new Date(),
      },
      create: {
        userId,
        name: processedFormData.officialName,
        shortName: processedFormData.shortName || "",
        description: processedFormData.shortDescription || undefined,
        contactEmail: processedFormData.contactEmail,
        contactPhone: formattedPhoneOrg,
        foundingDate: processedFormData.foundingDate || undefined,
        membersCount: processedFormData.membersCount || undefined,
        headquarters: processedFormData.headquarters || undefined,
        logo: processedFormData.logo || undefined,
        website: undefined,
        socialLinks: {},
        city: processedFormData.city || undefined,
        state: processedFormData.state,
        country: processedFormData.country,
        organizationType: processedFormData.organizationType,
        workAreas: processedFormData.workAreas,
        previousInitiatives: processedFormData.previousInitiatives || undefined,
        officialLicense: processedFormData.officialLicense || undefined,
        identificationCard: processedFormData.identificationCard || undefined,
        userRole: processedFormData.role || "رئيس المنظمة",
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Update user record to set type to organizer
    await prisma.user.update({
      where: { id: userId },
      data: {
        userType: UserType.organization,
        phone: formattedPhone,
        profileCompleted: processedFormData.acceptConditions || false,
        organization: {
          connect: { id: organization.id },
        },
        updatedAt: new Date(),
      },
    });

    revalidatePath(AUTHORIZED_REDIRECTION);
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const treeError = z.treeifyError(error);
      const fieldErrors: Partial<
        Record<keyof OrgRegistrationFormData, string[]>
      > = {};

      // Extract field-specific errors from the tree structure
      if (typeof treeError === "object" && treeError !== null) {
        for (const [field, fieldError] of Object.entries(treeError)) {
          if (
            field !== "formErrors" &&
            typeof fieldError === "object" &&
            fieldError !== null &&
            "errors" in fieldError
          ) {
            fieldErrors[field as keyof OrgRegistrationFormData] = (
              fieldError as { errors: string[] }
            ).errors;
          }
        }
      }

      return {
        success: false,
        errors: fieldErrors,
      };
    }

    console.error("Organization profile completion error:", error);
    return {
      success: false,
      error: "حدث خطأ أثناء حفظ بيانات المنظمة. يرجى المحاولة مرة أخرى",
    };
  }
}

/**
 * Fetch the organization logo for the currently logged-in user.
 * @returns the logo path or null
 */
export async function getOrganizationLogo(): Promise<string | null> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) return null;

    const data = await OrganizationService.getOrganizationLogo(session.user.id);

    return data?.logo || null;
  } catch (error) {
    console.error("Failed to fetch organization logo:", error);
    return null;
  }
}

/** Fetch the user image for the currently logged-in user. */
export async function getUserImage(): Promise<string | null> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) return null;

    const data = await UserService.getUserImage(session.user.id);
    return data?.image || null;
  } catch (error) {
    console.error("Failed to fetch user image:", error);
    return null;
  }
}
