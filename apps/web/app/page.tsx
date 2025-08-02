import { prismaClient } from "@repo/db/prismaClient";

export default async function Home() {
  const user = await prismaClient.user.findFirst();
  return (
  <>
  <div>
    {user?.username}
    {user?.password}
  </div>
  </>
  );
}