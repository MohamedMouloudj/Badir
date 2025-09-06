import UserProfileForm from "@/components/pages/porfile/UserProfile";
import getSessionWithCheckProfile from "@/hooks/getSessionWithCheckProfile";
import { toPlainUser } from "@/lib/utils";
import { UserService } from "@/services/user";
import { UserType } from "@prisma/client";
import React from "react";

export default async function Page() {
  const session = await getSessionWithCheckProfile();

  try {
    if (session === null) return null;
    if (session.user.userType !== UserType.organization) {
      const userProfile = await UserService.getUser(session.user.id);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let userProfileData = { ...userProfile } as Partial<any>;
      if (userProfile)
        userProfileData = toPlainUser(
          userProfile,
          userProfile.qualifications?.[0]
        );

      return <UserProfileForm defaultValues={userProfileData} />;
    }
  } catch (error) {
    console.error("Error loading profile page:", error);
    return <div>Error loading profile page</div>;
  }
}
