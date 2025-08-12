import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const getSessionWithCheckProfile = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session && !session.user.profileCompleted) {
    redirect("/complete-profile");
  }
  return session;
};

export default getSessionWithCheckProfile;
