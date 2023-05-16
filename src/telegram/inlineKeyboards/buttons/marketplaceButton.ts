import type {InlineKeyboardButton} from 'node-telegram-bot-api';

const marketplaceButton = (productUrl: string): InlineKeyboardButton => ({
	text: 'Маркетплейс',
	url: productUrl,
});

export default marketplaceButton;
