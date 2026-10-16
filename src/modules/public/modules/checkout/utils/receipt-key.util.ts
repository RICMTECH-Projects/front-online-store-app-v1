export const receiptKey = (userId: number, orderId: number) =>
	`urbnvoid-order:${userId}:${orderId}`;
