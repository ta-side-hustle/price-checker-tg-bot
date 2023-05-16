import type TelegramBot from 'node-telegram-bot-api';
import { type Message } from 'node-telegram-bot-api';
import { type ObjectId } from 'mongodb';
import { type ReplyAction } from '../types/ReplyAction.js';
import { reply } from '../utils/reply.js';
import { deleteUserProductEntity } from '../../db/index.js';
import handleListCommand from './listCommand.js';
import messages from '../messages/index.js';
import keyboards from '../inlineKeyboards/index.js';

export default async function handleRemoveCommand(
	bot: TelegramBot,
	msg: Message,
	productId: ObjectId,
	action: ReplyAction = 'reply'
): Promise<void> {
	const isSuccess = await deleteUserProductEntity(msg.chat.id, productId);

	if (isSuccess) {
		return handleListCommand(bot, msg, 1, action, 'Товар удален');
	}

	return reply(bot, msg, messages.error('При удалении товара произошла ошибка'), keyboards.empty(), action);
}
