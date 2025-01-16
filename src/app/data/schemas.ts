import { z } from "zod";

export const AddUserSchema = z.object({
    name: z.string(),
    email: z.string(),
    address: z.string(),
    phone: z.string(),
    gender: z.enum(["Male","Female"]),
});

export type AddUser = z.infer<typeof AddUserSchema>;

export const EditUserSchema = z.object({
    name: z.string(),
    address: z.optional(z.string()),
    phone: z.optional(z.string()),
    gender: z.optional(z.enum(["Male","Female"])),
});

export type EditUser = z.infer<typeof EditUserSchema>;
