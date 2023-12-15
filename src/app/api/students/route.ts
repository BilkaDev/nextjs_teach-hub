import { getServerSession } from "next-auth";
import { z } from "zod";

import { addStudentValidator } from "@/lib/validations/add-student";
import { authOptions } from "@/lib/auth";
import { fetchRedis } from "@/helpers/redis";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email: emailToAdd } = addStudentValidator.parse(body.email);

    const idToAdd = (await fetchRedis(
      "get",
      `user:email:${emailToAdd}`
    )) as string;

    if (!idToAdd) {
      return new Response("This person does not exist.", { status: 400 });
    }

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (idToAdd === session.user.id) {
      return new Response("You cannot add yourself as a student", {
        status: 400
      });
    }
    const isAlreadyAdded = (await fetchRedis(
      "sismember",
      `user:${idToAdd}:incoming_student_request`,
      session.user.id
    )) as 0 | 1;

    if (isAlreadyAdded) {
      return new Response("Already added this user", { status: 400 });
    }

    const isAlreadyStudent = (await fetchRedis(
      "sismember",
      `user:${idToAdd}:student`,
      idToAdd
    )) as 0 | 1;

    if (isAlreadyStudent) {
      return new Response("Already is student", { status: 400 });
    }

    await db.sadd(`user:${idToAdd}:incoming_student_request`, session.user.id);
    return new Response("OK");
  } catch (e) {
    if (e instanceof z.ZodError) {
      return new Response("Invalid request payload", { status: 422 });
    }
    return new Response("Invalid request", { status: 400 });
  }
}
