import type { InlineKeyboardMarkup } from 'node-telegram-bot-api';
import buttons from './buttons/index.js';

const emptyKeyboard = (): InlineKeyboardMarkup => ({
	inline_keyboard: [
		[
			buttons.list(),
		],
	],
});

export default emptyKeyboard;
