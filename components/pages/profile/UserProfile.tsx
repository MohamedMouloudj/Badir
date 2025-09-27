"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import FormInput from "@/components/FormInput";
import country from "country-list-js";
import { UserProfile } from "@/schemas/userProfileSchema";
import { handleFileUpload, mimeTypeToExtension } from "@/lib/utils";
import { BUCKET_MIME_TYPES, BUCKET_SIZE_LIMITS } from "@/types/Statics";
import { educationalLevelOptions } from "@/schemas";
import { toast } from "sonner";
import {
  Calendar,
  Edit2Icon,
  Loader2,
  Mail,
  MapPin,
  Save,
  User,
} from "lucide-react";
import AppButton from "@/components/AppButton";
import { getUserImage, updateUserProfileAction } from "@/actions/user-profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { isEqual } from "lodash";

interface UserProfileFormProps {
  defaultValues: Partial<UserProfile> & { createdAt?: Date | string };
}

export default function UserProfileForm({
  defaultValues,
}: UserProfileFormProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const disabled = !isUpdating;
  const [isPending, startTransition] = useTransition();

  const [userImage, setUserImage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
    setError,
  } = useForm<UserProfile>({
    // resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      ...defaultValues,
      image: null,
    },
  });

  const handleFormSubmit = async (data: UserProfile) => {
    try {
      const formData = { ...data };
      const originalData = { ...defaultValues };

      const hasImageChanges = data.image !== null;

      delete formData.image;

      const hasFieldChanges = !isEqual(formData, originalData);
      if (!hasFieldChanges && !hasImageChanges) {
        toast.warning("لم يتم إجراء أي تغييرات للحفظ");
        setIsUpdating(false);
        return;
      }

      startTransition(async () => {
        const result = await updateUserProfileAction(data);

        if (result.success) {
          toast.success(result.message || "تم حفظ التغييرات بنجاح");
          setIsUpdating(false);
        } else {
          if (result.errors) {
            // Handle field errors
            Object.entries(result.errors).forEach(([field, messages]) => {
              setError(field as keyof UserProfile, {
                message: Array.isArray(messages)
                  ? messages[0]
                  : (messages as string),
              });
            });
          }
          toast.error(result.error || "فشل في حفظ البيانات");
        }
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("حدث خطأ أثناء حفظ البيانات");
    }
  };

  const COUNTRIES = useMemo(() => {
    const countries = country.names();
    return countries.sort().map((countryName) => ({
      value: countryName,
      label: countryName,
    }));
  }, []);

  useEffect(() => {
    const subscription = watch(() => {
      clearErrors();
    });
    return () => subscription.unsubscribe();
  }, [watch, clearErrors]);

  useEffect(() => {
    async function fetchUserImage() {
      const image = await getUserImage();
      if (!image) {
        setUserImage(null);
        return;
      }

      setUserImage(image);
    }

    fetchUserImage();

    return () => {
      setUserImage(null);
    };
  }, []);

  if (isPending)
    return (
      <div className="flex-center justify-center min-h-screen w-full">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    );

  return (
    <>
      <div className="flex-center gap-4 mb-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={userImage || ""} alt={"المستخدم"} />
          <AvatarFallback className="border-2 border-primary-500 text-primary-500 font-semibold">
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-center-column items-start gap-2">
          <h2 className="text-2xl font-bold text-neutrals-700">
            {defaultValues.firstName || "المستخدم"}{" "}
            {defaultValues.lastName || ""}
          </h2>
          <p className="text-neutrals-500">
            {defaultValues.qualifications?.currentJob || ""}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {" "}
        <div className="flex-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex-center justify-baseline gap-4 flex-wrap flex-1">
            <span className="text-caption text-neutrals-500">
              <Calendar className="inline mx-1 mb-0.5 size-5" />
              انضم في:{" "}
              {defaultValues.createdAt
                ? typeof defaultValues.createdAt === "string"
                  ? new Date(defaultValues.createdAt).toLocaleDateString("ar", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : defaultValues.createdAt.toLocaleDateString("ar", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                : ""}
            </span>
            <span className="text-caption text-neutrals-500">
              <MapPin className="inline mx-1 mb-0.5 size-5" />
              {defaultValues.country + " - " + defaultValues.state}
            </span>
            <span className="text-caption text-neutrals-500">
              <Mail className="inline mx-1 mb-0.5 size-5" />
              {defaultValues.email || ""}
            </span>
          </div>
          <div className="flex-center gap-4">
            {isUpdating ? (
              <>
                <AppButton
                  size="sm"
                  type="outline"
                  onClick={() => setIsUpdating(!isUpdating)}
                >
                  إلغاء
                </AppButton>
                <AppButton
                  size="sm"
                  type="submit"
                  icon={
                    isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )
                  }
                >
                  {isPending ? "جاري الحفظ..." : "حفظ"}
                </AppButton>
              </>
            ) : (
              <AppButton
                size="sm"
                type="outline"
                icon={<Edit2Icon className="w-4 h-4" />}
                onClick={() => setIsUpdating(!isUpdating)}
              >
                تعديل
              </AppButton>
            )}
          </div>
        </div>
        {/* Personal Information Section */}
        <div className="bg-neutrals-100 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-neutrals-700 mb-4">
            المعلومات الأساسية
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <FormInput
                  type="text"
                  label="الاسم"
                  name="firstName"
                  placeholder="الاسم"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.firstName?.message}
                  disabled={disabled}
                />
              )}
            />

            {/* Last Name */}
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <FormInput
                  type="text"
                  label="اللقب"
                  name="lastName"
                  placeholder="اللقب"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.lastName?.message}
                  disabled={disabled}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <FormInput
                  type="text"
                  label="البريد الإلكتروني"
                  name="email"
                  placeholder="البريد الإلكتروني"
                  value={defaultValues.email || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.email?.message}
                  disabled
                />
              )}
            />
            {/* Phone */}
            <div className="flex gap-4">
              <Controller
                name="phoneCountryCode"
                control={control}
                render={({ field }) => <input type="hidden" {...field} />}
              />
              <Controller
                name="phone"
                control={control}
                render={({ field: { onChange, value, onBlur } }) => {
                  const countryCode = watch("phoneCountryCode") || "DZ";

                  return (
                    <FormInput
                      type="tel"
                      name="phone"
                      label="رقم الهاتف"
                      placeholder="5xxxxxxxx"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={errors.phone?.message}
                      countryCode={countryCode}
                      onCountryChange={(code) =>
                        setValue("phoneCountryCode", code)
                      }
                      disabled={disabled}
                    />
                  );
                }}
              />
            </div>

            <Controller
              name="bio"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <FormInput
                    className="col-span-1 md:col-span-2"
                    type="textarea"
                    label="نبذة عني"
                    name={field.name}
                    placeholder="اكتب نبذة عنك"
                    value={field.value || ""}
                    onChange={field.onChange}
                    error={fieldState.error?.message}
                    rtl={true}
                    isOptional
                    disabled={disabled}
                  />
                );
              }}
            />
          </div>
        </div>
        {/* Location Information */}
        <div className="bg-neutrals-100 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-neutrals-700 mb-4">
            معلومات السكن
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Country */}
            <Controller
              name="country"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <FormInput
                  type="select"
                  options={COUNTRIES}
                  name="country"
                  label="البلد"
                  placeholder="الجزائر"
                  value={value || "Algeria"}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={errors.country?.message}
                  disabled={disabled}
                />
              )}
            />

            {/* State */}
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <FormInput
                  type="text"
                  label="الولاية"
                  name="state"
                  placeholder="اختر الولاية"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.state?.message}
                  disabled={disabled}
                />
              )}
            />

            {/* City */}
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <FormInput
                  type="text"
                  label="المدينة"
                  name="city"
                  placeholder="المدينة"
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.city?.message}
                  isOptional
                  disabled={disabled}
                />
              )}
            />
          </div>
        </div>
        {/* Educational Information */}
        <div className="bg-neutrals-100 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-neutrals-700 mb-4">
            المعلومات التعليمية والمهنية
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Educational Level */}
            <Controller
              name="qualifications.educationalLevel"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormInput
                  type="radio"
                  name="educationalLevel"
                  className="md:col-span-2"
                  label="المستوى التعليمي"
                  placeholder="اختر المستوى التعليمي"
                  value={value}
                  onChange={onChange}
                  options={educationalLevelOptions}
                  error={errors.qualifications?.educationalLevel?.message}
                  disabled={disabled}
                />
              )}
            />

            <Controller
              name="qualifications.specification"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <FormInput
                  type="text"
                  name="specification"
                  label="التخصص"
                  placeholder="مثال: هندسة معمارية، طب، تكنولوجيا معلومات"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={errors.qualifications?.specification?.message}
                  disabled={disabled}
                />
              )}
            />

            {/* Current Job */}
            <Controller
              name="qualifications.currentJob"
              control={control}
              render={({ field }) => (
                <FormInput
                  type="text"
                  label="الوظيفة الحالية"
                  name="currentJob"
                  placeholder="الوظيفة الحالية"
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.qualifications?.currentJob?.message}
                  isOptional
                  disabled={disabled}
                />
              )}
            />
          </div>
        </div>
        {/* Profile Image and Bio */}
        <div className="bg-neutrals-100 p-6 rounded-lg">
          <div className="space-y-4">
            {/* Profile Image */}
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <FormInput
                  type="file"
                  label="الصورة الشخصية"
                  name="image"
                  placeholder="اختر صورة شخصية"
                  error={errors.image?.message}
                  value={field.value || ""}
                  onChange={field.onChange}
                  rtl={true}
                  fileAccept={BUCKET_MIME_TYPES.avatars.map(
                    mimeTypeToExtension
                  )}
                  fileMaxSize={BUCKET_SIZE_LIMITS.avatars / 1024 / 1024}
                  onFileChange={(file, onChange) =>
                    handleFileUpload(
                      file,
                      BUCKET_SIZE_LIMITS.avatars,
                      (value) => onChange(JSON.stringify(value))
                    )
                  }
                  isOptional
                  disabled={disabled}
                />
              )}
            />
          </div>
        </div>
      </form>
    </>
  );
}
