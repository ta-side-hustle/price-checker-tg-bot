import type TelegramBot from 'node-telegram-bot-api';
import { type Message } from 'node-telegram-bot-api';
import { type ObjectId } from 'mongodb';
import { type ReplyAction } from '../types/ReplyAction.js';
import { reply } from '../utils/index.js';
import { ProductDetailsService } from '../../services/index.js';
import messages from '../messages/index.js';
import keyboards from '../inlineKeyboards/index.js';

export default async function handleProductDetailsCommand(
	bot: TelegramBot,
	msg: Message,
	productId: ObjectId,
	page: number,
	action: ReplyAction = 'reply'
): Promise<void> {
	const result = await ProductDetailsService.get(productId);

	if (!result || result.isException) {
		const userErrorMessage = result()?.message ?? messages.detailsNotFound();

		return reply(bot, msg, userErrorMessage, keyboards.empty(), action);
	}

	const { product, price } = result();

	const responseMessage = messages.details(product, price);
	const keyboard = keyboards.details(product._id, product.url, page);

	return reply(bot, msg, responseMessage, keyboard, action);
}
