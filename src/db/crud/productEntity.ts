import type { ObjectId, WithId } from 'mongodb';
import type { ProductEntity } from '../types/index.js';
import { useDatabase } from '../client.js';

const DB_NAME = 'products';

type FindResult = WithId<ProductEntity> | null;
type FindManyResult = WithId<ProductEntity>[] | null;

export async function getProductEntity(productId: ObjectId): Promise<FindResult> {
	return useDatabase('checker', (db) => db.collection<ProductEntity>(DB_NAME).findOne({ _id: productId }));
}

export async function getProductEntityByMarketplaceId(marketplaceId: number): Promise<FindResult> {
	return useDatabase('checker', (db) => db.collection<ProductEntity>(DB_NAME).findOne({ marketplaceId }));
}

export async function getProductEntities(): Promise<FindManyResult> {
	return useDatabase('checker', async (db) => {
		const products = await db.collection<ProductEntity>(DB_NAME).find().toArray();

		return products.length === 0 ? null : products;
	});
}

export async function addProductEntity(productEntity: ProductEntity): Promise<FindResult> {
	return useDatabase('checker', async (db) => {
		const insertResult = await db.collection<ProductEntity>(DB_NAME).insertOne(productEntity);

		return getProductEntity(insertResult.insertedId);
	});
}

export async function deleteProductEntity(productId: ObjectId): Promise<boolean> {
	return useDatabase('checker', async (db) => {
		const result = await db.collection(DB_NAME).deleteOne({ _id: productId });

		return result.acknowledged;
	});
}
