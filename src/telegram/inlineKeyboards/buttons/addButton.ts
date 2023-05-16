import type { InlineKeyboardButton } from 'node-telegram-bot-api';
import type { CallbackQueryPayload } from '../../types/CallbackQueryPayload.js';

const addButton = (): InlineKeyboardButton => ({
	text: '+ Добавить',
	callback_data: JSON.stringify({
		cmd: 'add',
	} as CallbackQueryPayload),
});

export default addButton;
