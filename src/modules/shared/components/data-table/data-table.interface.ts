export type PaginationMode =
	| { type: "client"; pageSize?: number }
	| {
			type: "server";
			pageIndex: number;
			pageSize: number;
			pageCount: number;
			onPageChange: (pageIndex: number) => void;
	  };
