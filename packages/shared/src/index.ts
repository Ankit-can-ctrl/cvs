import { email, z } from "zod";

export const SignupSchema = z.object({
  name: z.string(),
  email: z.string().pipe(email()),
  password: z.string().min(6),
});

export const SigninSchema = z.object({
  email: z.string().pipe(email()),
  password: z.string(),
});

export const CreateRoomSchema = z.object({
  name: z.string().min(3),
});

// types
export type SignupInput = z.infer<typeof SignupSchema>;
export type SigninInputs = z.infer<typeof SigninSchema>;
export type CreateRoomInput = z.infer<typeof CreateRoomSchema>;
