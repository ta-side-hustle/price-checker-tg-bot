import type { ObjectId, WithId } from 'mongodb';
import { type Exception, exception, type Success, success } from 'exceptionally';
import type { ProductEntity, ProductPriceEntity } from '../db/index.js';
import { addProductEntity, getProductEntities, getProductEntity, getProductEntityByMarketplaceId } from '../db/index.js';
import { ProductNotFoundException, ProductSaveException } from './exceptions/index.js';

export type ProductWithPrice = {
	product: WithId<ProductEntity>;
	price: WithId<ProductPriceEntity>;
};

export class ProductService {
	static async exist(marketplaceId: number) {
		const product = await getProductEntityByMarketplaceId(marketplaceId);

		return {
			exist: product !== null,
			product,
		};

		// return product !== null;
	}

	static async save(entity: ProductEntity) {
		const existed = await ProductService.get(entity.marketplaceId);

		if (existed.isSuccess) {
			return success(existed());
		}

		const product = await addProductEntity(entity);

		const ex = new ProductSaveException(new Error('productSave got Null'));

		return product === null ? exception(ex) : success(product);
	}

	static async get(productId: ObjectId): Promise<Success<WithId<ProductEntity>> | Exception<ProductNotFoundException>>;

	static async get(marketplaceId: number): Promise<Success<WithId<ProductEntity>> | Exception<ProductNotFoundException>>;

	static async get(id: ObjectId | number): Promise<Success<WithId<ProductEntity>> | Exception<ProductNotFoundException>> {
		const product = typeof id === 'number' ? await getProductEntityByMarketplaceId(id) : await getProductEntity(id);

		if (!product) {
			const ex = new ProductNotFoundException(new Error(`Got Null for product id: ${id.toString()}`));
			return exception(ex);
		}

		return success(product);
	}

	static async getAll() {
		const products = await getProductEntities();

		if (!products || products.length === 0) {
			const ex = new ProductNotFoundException(new Error(`Empty products array`));
			return exception(ex);
		}

		return success(products);
	}
}
