import type { z } from "zod";
import type { AdminUser } from "../index";
import type { userSchema } from "../schemas/user.schema";

export type UserForm = z.infer<typeof userSchema>;
export const USER_FORM_DEFAULTS: UserForm = {
	email: "",
	password: "",
	firstName: "",
	lastName: "",
	status: "ACTIVE",
	roleCodes: ["CUSTOMER"],
};
export const EMPTY_ADMIN_USERS: AdminUser[] = [];
