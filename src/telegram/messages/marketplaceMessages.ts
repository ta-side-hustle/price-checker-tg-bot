import { markdownv2 as format } from 'telegram-format';

const marketplaceUnsupported = (): string => format.escape('В данный момент поддерживается только Wildberries');

const marketplaceItemNotFound = (id: number | string): string =>
	format.escape(`Товар с id ${id} не найден на wb, убедись что в url присутствует идентификатор товара`);

const marketplaceMessages = {
	marketplaceUnsupported,
	marketplaceItemNotFound,
} as const;

export default marketplaceMessages;
