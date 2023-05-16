import type { ObjectId, WithId } from 'mongodb';
import type { ProductEntity } from '../db/index.js';
import { fetchProductPrice, type ProductPrice } from '../wb/index.js';
import { signalJobDone, signalJobError } from './utils/signal.js';
import { isPricesDiffer } from '../utils/index.js';
import { ProductPriceService, ProductService } from '../services/index.js';
import { logger } from '../logger/index.js';

async function savePrice(productId: ObjectId, price: ProductPrice) {
	return ProductPriceService.save({
		productId,
		timestamp: new Date(),
		basePrice: price.basePrice,
		currentPrice: price.currentPrice,
		salePercent: price.salePercent,
	});
}

const products = await ProductService.getAll();

if (products.isException) {
	const exception = products();
	logger.error('Exception getting product list', exception);
	signalJobError(exception);
}

const productsList = products() as WithId<ProductEntity>[];

productsList.forEach(async (product) => {
	const [
		latestSavedPriceResult,
		currentPriceResult,
	] = await Promise.all([
		ProductPriceService.get(product._id),
		fetchProductPrice(product.marketplaceId),
	]);

	// exit if fetch failed
	if (currentPriceResult.isException) {
		return;
	}

	const currentPrice = currentPriceResult();

	// check if it's the first fetch; save price and exit
	if (latestSavedPriceResult.isException) {
		await savePrice(product._id, currentPrice);
		return;
	}

	const latestSavedPrice = latestSavedPriceResult();

	// we don't need to save another record with the same data,
	// so we check if prices are actually different
	if (isPricesDiffer(latestSavedPrice, currentPrice)) {
		await savePrice(product._id, currentPrice);
	}
});

signalJobDone();
