import type { ObjectId } from 'mongodb';

export type UserProductEntity = {
	chatId: number;
	productId: ObjectId;
	timestamp: Date;
};
