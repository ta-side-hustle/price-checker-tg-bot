import type { InlineKeyboardMarkup } from 'node-telegram-bot-api';
import type { ObjectId } from 'mongodb';
import buttons from './buttons/index.js';

const detailsKeyboard = (productId: ObjectId, productUrl: string, currentPage?: number): InlineKeyboardMarkup => ({
	inline_keyboard: [
		[
			buttons.marketplace(productUrl),
		],
		[
			buttons.remove(productId),
		],
		[
			buttons.list(currentPage),
		],
	],
});

export default detailsKeyboard;
