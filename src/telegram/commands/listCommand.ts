import type TelegramBot from 'node-telegram-bot-api';
import { type Message } from 'node-telegram-bot-api';
import { processInParallel } from 'exceptionally/utils';
import { type WithId } from 'mongodb';
import { type ReplyAction } from '../types/ReplyAction.js';
import { ProductDetailsService, type ProductWithPrice, UserProductService } from '../../services/index.js';
import { reply } from '../utils/index.js';
import { PagedArray, paginate } from '../../utils/index.js';
import { ProductEntity } from '../../db/index.js';
import messages from '../messages/index.js';
import keyboards from '../inlineKeyboards/index.js';

async function handleListEmpty(
	bot: TelegramBot,
	msg: Message,
	action: ReplyAction = 'reply',
	previousCommandResult: string | undefined = undefined
) {
	const previousActionMessage = previousCommandResult ? `${previousCommandResult}\n\n` : '';
	const listMessage = messages.listEmpty();

	const responseMessage = previousActionMessage + listMessage;
	await reply(bot, msg, responseMessage, keyboards.listEmpty(), action);
}

export default async function handleListCommand(
	bot: TelegramBot,
	msg: Message,
	page: number,
	action: ReplyAction = 'reply',
	previousCommandResult: string | undefined = undefined
): Promise<void> {
	const products = await UserProductService.getProducts(msg.chat.id);

	if (products.isException) {
		return handleListEmpty(bot, msg, action, previousCommandResult);
	}

	const productsWithPrice = await processInParallel(
		products().map((p: WithId<ProductEntity>) => ProductDetailsService.get(p._id))
	);

	if (productsWithPrice.isException) {
		return reply(bot, msg, messages.detailsNotFound(), keyboards.empty(), action);
	}

	const perPage = 5;
	const paginated: PagedArray<ProductWithPrice> = paginate(productsWithPrice(), page, perPage);

	const previousActionMessage = previousCommandResult ? `${previousCommandResult}\n\n` : '';
	const listMessage = messages.list(paginated);

	const responseMessage = previousActionMessage + listMessage;
	const keyboard = keyboards.list(paginated);

	return reply(bot, msg, responseMessage, keyboard, action);
}
