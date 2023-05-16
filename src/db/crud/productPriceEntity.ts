import type { ObjectId, WithId } from 'mongodb';
import type { ProductPriceEntity } from '../types/index.js';
import { useDatabase } from '../client.js';

const DB_NAME = 'productPrice';

type FindResult = WithId<ProductPriceEntity> | null;
type FindManyResult = WithId<ProductPriceEntity>[] | null;

export async function addProductPriceEntity(productPriceEntity: ProductPriceEntity): Promise<FindResult> {
	return useDatabase('checker', async (db) => {
		const productPrices = db.collection<ProductPriceEntity>(DB_NAME);

		const productPriceInsertResult = await productPrices.insertOne(productPriceEntity);

		return productPrices.findOne({ _id: productPriceInsertResult.insertedId });
	});
}

export async function getProductPriceEntities(productId: ObjectId): Promise<FindManyResult> {
	return useDatabase('checker', async (db) => {
		const prices = await db
			.collection<ProductPriceEntity>(DB_NAME)
			.find({ productId })
			.sort({ timestamp: -1 })
			.toArray();

		return prices.length === 0 ? null : prices;
	});
}

export async function deleteProductPriceEntities(productId: ObjectId): Promise<boolean> {
	return useDatabase('checker', async (db) => {
		const result = await db.collection(DB_NAME).deleteOne({ productId });

		return result.acknowledged;
	});
}
