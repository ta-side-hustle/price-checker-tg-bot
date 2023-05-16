import type TelegramBot from 'node-telegram-bot-api';
import { type Message } from 'node-telegram-bot-api';
import { ObjectId } from 'mongodb';
import type { CallbackQueryPayload } from '../types/CallbackQueryPayload.js';
import { logError } from './errorHandler.js';
import { parseDataPayload } from '../utils/index.js';
import {
	handleAddPromptCommand,
	handleListCommand,
	handleProductDetailsCommand,
	handleRemoveCommand,
} from '../commands/index.js';

async function handleAddCallback(bot: TelegramBot, msg: Message): Promise<void> {
	await handleAddPromptCommand(bot, msg, 'reword');
}

async function handleDetailsCallback(bot: TelegramBot, msg: Message, payload: CallbackQueryPayload): Promise<void> {
	const page = payload.page ?? 1;

	await handleProductDetailsCommand(bot, msg, new ObjectId(payload.pId), page, 'reword');
}

async function handleListCallback(bot: TelegramBot, msg: Message, payload: CallbackQueryPayload): Promise<void> {
	const page = payload.page ?? 1;

	await handleListCommand(bot, msg, page, 'reword');
}

async function handleRemoveCallback(bot: TelegramBot, msg: Message, payload: CallbackQueryPayload): Promise<void> {
	await handleRemoveCommand(bot, msg, new ObjectId(payload.pId), 'reword');
}

export default function callbackHandler(bot: TelegramBot): void {
	bot.on('callback_query', async (query) => {
		const msg = query.message;

		if (!msg) {
			await logError(new Error('No message property in query'), bot);
			return;
		}

		const payloadResult = parseDataPayload(query.data);

		if (payloadResult.isException) {
			await handleListCommand(bot, msg, 1, 'reword', 'При обработке команды произошла ошибка, попробуй еще раз');
			return;
		}

		const payload = payloadResult();

		switch (payload.cmd) {
			case 'add':
				await handleAddCallback(bot, msg);
				break;
			case 'details':
				await handleDetailsCallback(bot, msg, payload);
				break;
			case 'remove':
				await handleRemoveCallback(bot, msg, payload);
				break;
			case 'list':
				await handleListCallback(bot, msg, payload);
				break;
			default:
				await handleListCommand(bot, msg, 1, 'reword', `неизвестная команда: ${payload.cmd}`);
		}
	});
}
