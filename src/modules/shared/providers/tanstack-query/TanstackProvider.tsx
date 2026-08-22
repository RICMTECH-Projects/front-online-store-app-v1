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
	mutationCache: new MutationCache({ onError: showErrorToast }),
	queryCache: new QueryCache({ onError: showErrorToast }),
});

export const TanstackProvider = ({ children }: Props) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};
