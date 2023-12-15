import { z } from "zod";

export const addStudentValidator = z.object({
  email: z.string().email()
});
