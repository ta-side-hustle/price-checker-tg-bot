import type { ObjectId } from 'mongodb';

export type ProductPriceEntity = {
	timestamp: Date;
	productId: ObjectId;
	basePrice: number;
	currentPrice: number;
	salePercent: number;
};
