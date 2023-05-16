import type TelegramBot from 'node-telegram-bot-api';
import { type Message } from 'node-telegram-bot-api';
import { type ReplyAction } from '../types/ReplyAction.js';
import { reply } from '../utils/index.js';
import { fetchProductDetails, ProductDetail } from '../../wb/index.js';
import { extractIdFromProductShareLink } from '../../wb/utils/index.js';
import { ProductDetailsService, ProductService } from '../../services/index.js';
import { logError } from '../handlers/index.js';
import messages from '../messages/index.js';
import keyboards from '../inlineKeyboards/index.js';

export async function handleAddPromptCommand(bot: TelegramBot, msg: Message, action: ReplyAction = 'reply'): Promise<void> {
	await reply(bot, msg, messages.addPrompt(), keyboards.empty(), action);
}

export async function handleAddCommand(
	bot: TelegramBot,
	msg: Message,
	url: string,
	action: ReplyAction = 'reply'
): Promise<void> {
	try {
		const chatId = msg.chat.id;
		const marketplaceId = extractIdFromProductShareLink(url);

		const { product: existedProduct, exist } = await ProductService.exist(marketplaceId);

		if (exist && existedProduct !== null) {
			const result = await ProductDetailsService.get(existedProduct._id);

			if (result.isSuccess) {
				const { product, price } = result();
				const message = messages.addAlreadyExist(product, price);
				const keyboard = keyboards.details(product._id, product.url);

				return reply(bot, msg, message, keyboard, action);
			}
		}

		const fetchResult = await fetchProductDetails(marketplaceId);
		const productDetail = (fetchResult() as ProductDetail)?.data?.products?.at(0);

		if (fetchResult.isException || !productDetail) {
			return reply(bot, msg, messages.marketplaceItemNotFound(marketplaceId), keyboards.empty(), action);
		}

		const saveResult = await ProductDetailsService.save(chatId, productDetail, url);

		if (!saveResult || saveResult?.isException) {
			return reply(bot, msg, messages.addFailure(), keyboards.empty(), action);
		}

		const { product, price } = saveResult();

		const responseMessage = messages.addSuccess(product, price);
		const keyboard = keyboards.details(product._id, product.url);

		return reply(bot, msg, responseMessage, keyboard, action);
	} catch (e) {
		await logError(e, bot);
		return reply(bot, msg, messages.error(), keyboards.empty(), action);
	}
}
