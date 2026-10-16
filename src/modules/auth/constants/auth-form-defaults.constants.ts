import type { ChangePasswordFormValues } from "../schemas/change-password/change-password.schema";
import type { ResetPasswordFormValues } from "../schemas/reset-password/reset-password.schema";

export const LOGIN_DEFAULT_VALUES = { email: "", password: "" };
export const REGISTER_DEFAULT_VALUES = {
	confirmPassword: "",
	email: "",
	firstName: "",
	lastName: "",
	password: "",
};
export const RECOVERY_DEFAULT_VALUES = { email: "" };
export const RESET_PASSWORD_DEFAULT_VALUES: ResetPasswordFormValues = {
	confirmPassword: "",
	password: "",
};
export const CHANGE_PASSWORD_DEFAULT_VALUES: ChangePasswordFormValues = {
	confirmPassword: "",
	currentPassword: "",
	newPassword: "",
};
