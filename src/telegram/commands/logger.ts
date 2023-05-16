import type TelegramBot from 'node-telegram-bot-api';
import { logger } from '../../logger/index.js';

export default function setupLogger(bot: TelegramBot) {
	bot.on('message', (msg, meta) => {
		const messageType = meta?.type ?? 'unknown';

		const logEntry = `Got message of type: '${messageType}'`;
		const logData = {
			chatId: msg.chat.id,
			username: msg.chat.username,
			message: msg.text,
		};

		logger.info(logEntry, logData);
	});

	bot.on('callback_query', (query) => {
		const logEntry = `Got callback_query`;
		const logData = {
			chatId: query.from.id,
			username: query.from.username,
			payload: JSON.parse(query.data ?? ''),
		};

		logger.info(logEntry, logData);
	});
}
