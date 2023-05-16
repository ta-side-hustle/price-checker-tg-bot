import { markdownv2 as format } from 'telegram-format';
import type { ProductEntity, ProductPriceEntity } from '../../db/index.js';
import { formatAsRubbles, type PagedArray } from '../../utils/index.js';

const listEmpty = (): string => format.escape('Список пока пуст, давай добавим что-нибудь');

const listItem = (itemOrderNumber: number, product: ProductEntity, price: ProductPriceEntity | null): string => {
	let priceStr = 'цены пока что нет';
	if (price !== null) {
		priceStr = formatAsRubbles(price.currentPrice);
	}

	return format.escape(`${itemOrderNumber}. ${product.brand} | ${product.name} - ${priceStr}`);
};

const list = (
	pagedProducts: PagedArray<{
		product: ProductEntity;
		price: ProductPriceEntity | null;
	}>
): string =>
	pagedProducts.items
		.map(({ product, price }, index) => listItem(pagedProducts.firstItemNumber + index, product, price))
		.join('\n\n');

const listMessages = {
	listEmpty,
	list,
} as const;

export default listMessages;
