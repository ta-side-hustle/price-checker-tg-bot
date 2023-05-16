import type { ObjectId, WithId } from 'mongodb';
import { processInParallel } from 'exceptionally/utils';
import { Exception, exception, Success, success } from 'exceptionally';
import {
	addUserProductEntity,
	getUserProductEntitiesByChatId,
	getUserProductEntitiesByProductId,
	type ProductEntity,
	UserProductEntity,
} from '../db/index.js';
import { UserProductNotFoundException, UserProductSaveException } from './exceptions/index.js';
import { ProductService } from './ProductService.js';

export default class UserProductService {
	static async count(chatId: number): Promise<number> {
		const userProducts = await getUserProductEntitiesByChatId(chatId);

		return userProducts ? userProducts.length : 0;
	}

	static async save(chatId: number, productId: ObjectId) {
		const userProduct = await addUserProductEntity(chatId, productId);

		return userProduct === null
			? exception(new UserProductSaveException(new Error('userProductSave got Null')))
			: success(userProduct);
	}

	// eslint-disable-next-line max-len
	static async getLinks(chatId: number): Promise<Exception<UserProductNotFoundException> | Success<WithId<UserProductEntity>[]>>;

	static async getLinks(
		productId: ObjectId
	): Promise<Exception<UserProductNotFoundException> | Success<WithId<UserProductEntity>[]>>;

	static async getLinks(
		id: number | ObjectId
	): Promise<Exception<UserProductNotFoundException> | Success<WithId<UserProductEntity>[]>> {
		const result =
			typeof id === 'number' ? await getUserProductEntitiesByChatId(id) : await getUserProductEntitiesByProductId(id);

		if (!result) {
			return exception(new UserProductNotFoundException(new Error('userProductLinks got Null')));
		}

		return success(result);
	}

	static async getProducts(chatId: number) {
		const result = await processInParallel([
			UserProductService.getLinks(chatId),
			ProductService.getAll(),
		] as const);

		if (result.isException) {
			const ex = result().find((e) => !!e);
			return exception(ex);
		}

		const [
			userProductLinksList,
			allProducts,
		] = result();

		const userProductIds = userProductLinksList.map((product) => product.productId);

		const userProducts = allProducts.reduce((acc, cur) => {
			if (userProductIds.some((id) => id.equals(cur._id))) {
				return [
					...acc,
					cur,
				];
			}
			return acc;
		}, [] as WithId<ProductEntity>[]);

		return success(userProducts);
	}
}
