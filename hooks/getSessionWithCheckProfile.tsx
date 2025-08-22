import { auth } from "@/lib/auth";
import { UserType } from "@prisma/client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const getSessionWithCheckProfile = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session && !session.user.profileCompleted) {
    if (session.user.userType === UserType.organization) {
      redirect("/complete-profile/organization");
    } else {
      redirect("/complete-profile/user");
    }
  }
  return session;
};

export default getSessionWithCheckProfile;
