import { z } from "zod";
import { UserRole } from "./types";

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .email()
    .min(8, "Email must contain at least 8 characters!")
    .max(100, "Email must be no more than 100 characters!"),
  password: z
    .string()
    .trim()
    .min(8, "Password must contain at least 8 characters!"),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const ProfileSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(8, "Fullname must contain at least 8 characters!")
    .max(100, "Fullname must be no more than 100 characters!"),
});

export type ProfileSchemaType = z.infer<typeof ProfileSchema>;

export const UserSchema = z.object({
  email: z
    .string()
    .trim()
    .email()
    .min(8, "Email must contain at least 8 characters!")
    .max(100, "Email must be no more than 100 characters!"),
  full_name: z
    .string()
    .trim()
    .min(8, "Fullname must contain at least 8 characters!")
    .max(100, "Fullname must be no more than 100 characters!"),
  password: z
    .string()
    .trim()
    .min(8, "Password must contain at least 8 characters!")
    .optional(),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
});

export type UserSchemaType = z.infer<typeof UserSchema>;
