"use client";

import {
	MutationCache,
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { toast } from "sonner";
import { getErrorMessage } from "../http/utils/http.utils";

interface Props {
	children: React.ReactNode;
}

const showErrorToast = (error: unknown) => {
	toast.error(getErrorMessage(error));
};

const queryClient = new QueryClient({
	mutationCache: new MutationCache({
		onError: (error, _variables, _context, mutation) => {
			if (!mutation.meta?.silentError) showErrorToast(error);
		},
	}),
	queryCache: new QueryCache({
		onError: (error, query) => {
			if (!query.meta?.silentError) {
				showErrorToast(error);
			}
		},
	}),
});

export const TanstackProvider = ({ children }: Props) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};
