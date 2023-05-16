import type { InlineKeyboardButton } from 'node-telegram-bot-api';
import type { ObjectId } from 'mongodb';
import type { CallbackQueryPayload } from '../../types/CallbackQueryPayload.js';

const removeButton = (productId: ObjectId): InlineKeyboardButton => ({
	text: 'Удалить',
	callback_data: JSON.stringify({
		cmd: 'remove',
		pId: productId.toString(),
	} as CallbackQueryPayload),
});

export default removeButton;
