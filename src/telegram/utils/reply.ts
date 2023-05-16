import TelegramBot, {
	EditMessageTextOptions,
	InlineKeyboardMarkup,
	Message,
	SendMessageOptions,
} from 'node-telegram-bot-api';
import { logError } from '../handlers/index.js';
import { ReplyAction } from '../types/ReplyAction.js';

export async function sendReply(
	bot: TelegramBot,
	msg: Message,
	text: string,
	replyMarkup?: InlineKeyboardMarkup
): Promise<void> {
	const options: SendMessageOptions = {
		parse_mode: 'MarkdownV2',
		reply_markup: replyMarkup,
	};

	await bot.sendMessage(msg.chat.id, text, options);
}

export async function sendReword(bot: TelegramBot, msg: Message, text: string, replyMarkup?: InlineKeyboardMarkup) {
	const options: EditMessageTextOptions = {
		chat_id: msg.chat.id,
		message_id: msg.message_id,
		parse_mode: 'MarkdownV2',
		reply_markup: replyMarkup,
	};

	await bot.editMessageText(text, options);
}

export async function reply(
	bot: TelegramBot,
	msg: Message,
	text: string,
	replyMarkup?: InlineKeyboardMarkup,
	action: ReplyAction = 'reply'
): Promise<void> {
	try {
		switch (action) {
			case 'reply':
				await sendReply(bot, msg, text, replyMarkup);
				break;
			case 'reword':
				await sendReword(bot, msg, text, replyMarkup);
				break;
			default:
				await logError(new Error(`Unsupported reply action: ${action}`), bot);
				await sendReply(bot, msg, text, replyMarkup);
				break;
		}
	} catch (e) {
		await logError(e, bot);
	}
}
