import type { InlineKeyboardButton, InlineKeyboardMarkup } from 'node-telegram-bot-api';
import type { WithId } from 'mongodb';
import type { ProductEntity, ProductPriceEntity } from '../../db/index.js';
import type { PagedArray } from '../../utils/index.js';
import buttons, { type ProductButtonInfo } from './buttons/index.js';

const listKeyboard = (
	pagedProducts: PagedArray<{
		product: WithId<ProductEntity>;
		price: ProductPriceEntity | null;
	}>
): InlineKeyboardMarkup => {
	const productButtonInfos: ProductButtonInfo[] = pagedProducts.items.map(({ product }, index) => ({
		id: product._id.toString(),
		orderNumber: pagedProducts.firstItemNumber + index,
	}));

	const navigation: InlineKeyboardButton[] = [];

	if (!pagedProducts.isFirstPage) {
		navigation.push(buttons.previousPage(pagedProducts.prevPage as number));
	}

	navigation.push(buttons.add());

	if (!pagedProducts.isLastPage) {
		navigation.push(buttons.nextPage(pagedProducts.nextPage as number));
	}

	return {
		inline_keyboard: [
			productButtonInfos.map((info) => buttons.details(info, pagedProducts.currentPage)),
			navigation,
		],
	};
};

export default listKeyboard;
