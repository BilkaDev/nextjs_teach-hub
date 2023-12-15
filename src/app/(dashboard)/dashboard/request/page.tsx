import { FC } from "react";
import { getServerSession, User } from "next-auth";
import { notFound } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { fetchRedis } from "@/helpers/redis";
import StudentRequest from "@/app/components/StudentRequest";
import { Typography } from "@/lib/uiElements/typography";

const Page: FC = async () => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const incomingSenderIds = (await fetchRedis(
    "smembers",
    `user:${session.user.id}:incoming_student_request`
  )) as string[];

  const incomingStudentRequest = await Promise.all(
    incomingSenderIds.map(async senderId => {
      const sender = (await fetchRedis("get", `user:${senderId}`)) as User;
      return {
        senderId,
        senderEmail: sender.email
      };
    })
  );

  return (
    <main className="pt-8">
      <Typography variant="h1" className=" mb-8">
        Student request
      </Typography>
      <div className="flex flex-col gap-4">
        <StudentRequest />
      </div>
    </main>
  );
};

export default Page;
