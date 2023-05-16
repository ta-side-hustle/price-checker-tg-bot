import type { ObjectId } from 'mongodb';
import { exception, success } from 'exceptionally';
import { addProductPriceEntity, getProductPriceEntities, type ProductPriceEntity } from '../db/index.js';
import { PriceNotFoundException, ProductPriceSaveException } from './exceptions/index.js';

export default class ProductPriceService {
	static async save(entity: ProductPriceEntity) {
		const price = await addProductPriceEntity(entity);

		return price === null ? exception(new ProductPriceSaveException(new Error('productPriceSave got Null'))) : success(price);
	}

	static async get(productId: ObjectId) {
		const prices = await ProductPriceService.getAll(productId);

		if (prices.isException) {
			return prices;
		}

		const [
			price,
		] = prices();
		return success(price);
	}

	static async getAll(productId: ObjectId, limit = 2) {
		const prices = await getProductPriceEntities(productId);

		if (!prices || prices.length === 0) {
			return exception(new PriceNotFoundException(new Error(`Empty prices array for productId: ${productId.toString()}`)));
		}

		return success(prices.slice(0, limit));
	}
}
