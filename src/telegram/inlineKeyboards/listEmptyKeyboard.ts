import type { InlineKeyboardMarkup } from 'node-telegram-bot-api';
import buttons from './buttons/index.js';

const listEmptyKeyboard = (): InlineKeyboardMarkup => ({
	inline_keyboard: [
		[
			buttons.add(),
		],
	],
});

export default listEmptyKeyboard;
