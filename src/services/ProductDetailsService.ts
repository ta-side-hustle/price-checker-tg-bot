import type { ObjectId, WithId } from 'mongodb';
import { processInParallel } from 'exceptionally/utils';
import { exception, success } from 'exceptionally';
import ProductPriceService from './ProductPriceService.js';
import { ProductService, type ProductWithPrice } from './ProductService.js';
import type { ProductDetailDataProducts } from '../wb/index.js';
import type { ProductEntity, ProductPriceEntity, UserProductEntity } from '../db/index.js';
import UserProductService from './UserProductService.js';

export type SaveUserProductResult = {
	product: WithId<ProductEntity>;
	price: WithId<ProductPriceEntity>;
	link: WithId<UserProductEntity>;
};

export class ProductDetailsService {
	static async save(chatId: number, product: ProductDetailDataProducts, url: string) {
		const productEntity: ProductEntity = {
			marketplaceId: product.id,
			brand: product.brand,
			name: product.name,
			url,
		};

		const savedProduct = await ProductService.save(productEntity);

		if (savedProduct.isException) {
			return savedProduct;
		}

		const productPriceEntity: ProductPriceEntity = {
			productId: savedProduct()._id,
			timestamp: new Date(),
			basePrice: product.priceU / 100,
			currentPrice: product.salePriceU / 100,
			salePercent: product.sale,
		};

		const saveResult = await processInParallel([
			ProductPriceService.save(productPriceEntity),
			UserProductService.save(chatId, savedProduct()._id),
		] as const);

		if (saveResult.isException) {
			const [
				priceException,
				productException,
			] = saveResult();

			return exception(priceException || productException);
		}

		const [
			savedPrice,
			savedUserProduct,
		] = saveResult();

		return success<SaveUserProductResult>({
			product: savedProduct(),
			price: savedPrice,
			link: savedUserProduct,
		});
	}

	static async get(productId: ObjectId) {
		const result = await processInParallel([
			ProductService.get(productId),
			ProductPriceService.get(productId),
		] as const);

		if (result.isException) {
			const ex = result().find((e) => !!e);
			return exception(ex);
		}

		const [
			p,
			pr,
		] = result();

		return success<ProductWithPrice>({
			product: p,
			price: pr,
		});
	}
}
