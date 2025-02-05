import { z } from "zod";
import { ACCEPTED_FILE_TYPES, SERVERCONF } from "./constants";

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

export const ImportUserSchema = z.instanceof(File)
.optional()
.refine((file) => {
    return !file || file.size <= SERVERCONF.MAX_UPLOAD_SIZE;
}, `File must be less than ${SERVERCONF.MAX_UPLOAD_SIZE}`)
.refine((file) => {
    return ACCEPTED_FILE_TYPES.users.includes(file.type)
}, `File must be ${ACCEPTED_FILE_TYPES.users.join(' or ')}`);