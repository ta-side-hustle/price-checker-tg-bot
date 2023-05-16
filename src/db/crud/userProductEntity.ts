import type { Filter, ObjectId, WithId } from 'mongodb';
import type { UserProductEntity } from '../types/index.js';
import { useDatabase } from '../client.js';

const DB_NAME = 'userProducts';

type FindResult = WithId<UserProductEntity> | null;
type FindManyResult = WithId<UserProductEntity>[] | null;

export async function addUserProductEntity(chatId: number, productId: ObjectId): Promise<FindResult> {
	return useDatabase('checker', async (db) => {
		const userProducts = db.collection<UserProductEntity>(DB_NAME);
		const entity: UserProductEntity = {
			chatId,
			productId,
			timestamp: new Date(),
		};

		const userProductInsertResult = await userProducts.insertOne(entity);

		return userProducts.findOne({ _id: userProductInsertResult.insertedId });
	});
}

async function getUserProductEntities(filter: Filter<UserProductEntity>): Promise<FindManyResult> {
	return useDatabase('checker', async (db) => {
		const list = await db.collection<UserProductEntity>(DB_NAME).find(filter).sort({ timestamp: -1 }).toArray();

		return list.length === 0 ? null : list;
	});
}

export async function getUserProductEntitiesByChatId(chatId: number): Promise<FindManyResult> {
	const filter: Filter<UserProductEntity> = { chatId };
	return getUserProductEntities(filter);
}

export async function getUserProductEntitiesByProductId(productId: ObjectId): Promise<FindManyResult> {
	const filter: Filter<UserProductEntity> = { productId };
	return getUserProductEntities(filter);
}

export async function deleteUserProductEntity(chatId: number, productId: ObjectId): Promise<boolean> {
	return useDatabase('checker', async (db) => {
		const result = await db.collection<UserProductEntity>(DB_NAME).deleteOne({ chatId, productId });

		return result.acknowledged;
	});
}
