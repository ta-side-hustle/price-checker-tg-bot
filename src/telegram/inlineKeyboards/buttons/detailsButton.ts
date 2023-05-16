import type { InlineKeyboardButton } from 'node-telegram-bot-api';
import type { CallbackQueryPayload } from '../../types/CallbackQueryPayload.js';

export type ProductButtonInfo = { orderNumber: number; id: string };

export const detailsButton = (info: ProductButtonInfo, page?: number): InlineKeyboardButton => ({
	text: info.orderNumber.toString(10),
	callback_data: JSON.stringify({
		cmd: 'details',
		pId: info.id,
		page,
	} as CallbackQueryPayload),
});
