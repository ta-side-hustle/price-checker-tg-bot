import type { InlineKeyboardButton } from 'node-telegram-bot-api';
import type { CallbackQueryPayload } from '../../types/CallbackQueryPayload.js';

const listButton = (page?: number): InlineKeyboardButton => ({
	text: '<- Список',
	callback_data: JSON.stringify({
		cmd: 'list',
		page: page ?? 1,
	} as CallbackQueryPayload),
});

export default listButton;
