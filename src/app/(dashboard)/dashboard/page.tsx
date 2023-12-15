import { FC } from "react";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

interface PageProps {}

const Page: FC<PageProps> = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);

  return <div></div>;
};

export default Page;
