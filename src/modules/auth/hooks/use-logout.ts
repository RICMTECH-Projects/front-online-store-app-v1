'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { AUTH_ROUTES } from '../constants/auth.const';
import { logoutUser } from '../services/logout-user.service';
import { useAuthStore } from '../store/useAuthStore';

export const useLogout = () => {
	const router = useRouter();
	const clearUser = useAuthStore((state) => state.clearUser);
	const { mutate } = useMutation({
		mutationFn: logoutUser,
		onSettled: () => {
			clearUser();
			router.replace(AUTH_ROUTES.login);
		},
	});

	return mutate;
};
