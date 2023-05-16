import type { InlineKeyboardButton } from 'node-telegram-bot-api';
import type { CallbackQueryPayload } from '../../types/CallbackQueryPayload.js';

const previousPageButton = (page: number): InlineKeyboardButton => ({
	text: '<<',
	callback_data: JSON.stringify({
		cmd: 'list',
		page,
	} as CallbackQueryPayload),
});

export default previousPageButton;
