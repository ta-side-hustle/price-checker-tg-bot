import { markdownv2 as format } from 'telegram-format';
import type { WithId } from 'mongodb';
import type { ProductEntity, ProductPriceEntity } from '../db/index.js';
import { telegram } from '../telegram/index.js';
import { formatAsRubbles, isPricesDiffer } from '../utils/index.js';
import { signalJobDone, signalJobError } from './utils/signal.js';
import { ProductPriceService, ProductService, UserProductService } from '../services/index.js';
import { logger } from '../logger/index.js';

function formatEscapedPriceDiffString(any: number, latest: number): string {
	return format.escape(any === latest ? formatAsRubbles(latest) : `${formatAsRubbles(any)} -> ${formatAsRubbles(latest)}`);
}

function formatEscapedPercentDiffString(any: number, latest: number): string {
	return format.escape(any === latest ? `${latest}%` : `${any}% -> ${latest}%`);
}

function composeMessage(product: ProductEntity, any: ProductPriceEntity, latest: ProductPriceEntity): string {
	const headerString = format.bold('Изменилась цена на товар');

	const brand = format.escape(`${product.brand} | `);
	const url = format.url(product.name, product.url);
	const productString = brand + url;

	const basePrice = format.escape('Обычная цена: ') + formatEscapedPriceDiffString(any.basePrice, latest.basePrice);
	const currentPrice = format.escape('Цена со скидкой: ') + formatEscapedPriceDiffString(any.currentPrice, latest.currentPrice);
	const salePercent = format.escape('Скидка: ') + formatEscapedPercentDiffString(any.salePercent, latest.salePercent);
	const pricesString = `${basePrice}\n${currentPrice}\n${salePercent}`;

	return `${headerString}\n${productString}\n\n${pricesString}`;
}

const products = await ProductService.getAll();

if (products.isException) {
	const exception = products();
	logger.error('Exception getting product list', exception);
	signalJobError(exception);
}

const productsList = products() as WithId<ProductEntity>[];

productsList.forEach(async (product) => {
	const prices = await ProductPriceService.getAll(product._id, 2);

	// not enough data for comparison
	if (prices.isException || (prices() as []).length < 2) {
		return;
	}

	const [
		current,
		prev,
	] = prices();

	// skip if prices are the same
	if (!isPricesDiffer(prev, current)) {
		return;
	}

	const userChats = await UserProductService.getLinks(product._id);

	if (userChats.isException) {
		return;
	}

	const message = composeMessage(product, prev, current);

	const notifications = userChats().map((chat) => telegram.sendMessage(chat.chatId, message, { parse_mode: 'MarkdownV2' }));

	await Promise.allSettled(notifications);
});

signalJobDone();
