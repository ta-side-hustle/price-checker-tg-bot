import type TelegramBot from 'node-telegram-bot-api';
import { type Message } from 'node-telegram-bot-api';
import { markdownv2 as format } from 'telegram-format';
import { reply } from '../utils/reply.js';

export default async function handleStartCommand(bot: TelegramBot, msg: Message) {
	await reply(
		bot,
		msg,
		format.escape(
			'Я слежу за скидками на wb и сообщу тебе когда цена изменится.\nДля начала пришли мне ссылку на товар'
		)
	);
}
