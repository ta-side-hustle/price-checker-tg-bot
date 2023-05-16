import { markdownv2 as format } from 'telegram-format';
import type { ProductEntity, ProductPriceEntity } from '../../db/index.js';
import { formatAsRubbles } from '../../utils/index.js';

const details = (product: ProductEntity, price?: ProductPriceEntity | null): string => {
	const productInfoMessage = `${product.brand} | ${product.name}`;
	let productPriceMessage = '';

	if (price) {
		const basePriceInfo = `\n\nБазовая цена - ${formatAsRubbles(price.basePrice)}\n`;
		const currentPriceInfo = `Текущая цена - ${formatAsRubbles(price.currentPrice)} (со скидкой - ${
			price?.salePercent
		}%)`;
		productPriceMessage = basePriceInfo + currentPriceInfo;
	}

	return format.escape(productInfoMessage + productPriceMessage);
};

const detailsNotFound = (): string => format.escape('Информация о товаре не найдена');

const detailsMessages = {
	details,
	detailsNotFound,
} as const;

export default detailsMessages;
