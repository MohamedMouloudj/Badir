import getSessionWithCheckProfile from "@/hooks/getSessionWithCheckProfile";

export default async function Page() {
  const session = await getSessionWithCheckProfile();
  return <div></div>;
}
