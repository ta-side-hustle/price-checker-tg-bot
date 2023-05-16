import { markdownv2 as format } from 'telegram-format';
import type { ProductEntity, ProductPriceEntity } from '../../db/index.js';
import detailsMessages from './detailsMessages.js';

const addPrompt = (): string => format.escape('Пришли мне ссылку на товар');

const addSuccess = (product: ProductEntity, price: ProductPriceEntity): string => {
	const resultMessage = 'Товар добавлен к отслеживанию\n\n';
	const detailsMessage = detailsMessages.details(product, price);

	return format.escape(resultMessage) + detailsMessage;
};

const addFailure = (): string => format.escape('Не удалось сохранить товар');

const addAlreadyExist = (product: ProductEntity, price: ProductPriceEntity): string => {
	const resultMessage = 'Этот товар уже есть в списке\n\n';
	const detailsMessage = detailsMessages.details(product, price);

	return format.escape(resultMessage) + detailsMessage;
};

const addMessages = {
	addPrompt,
	addSuccess,
	addFailure,
	addAlreadyExist,
} as const;

export default addMessages;
