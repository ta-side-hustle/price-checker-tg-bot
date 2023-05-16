import { URL } from 'node:url';

/**
 * Extract id from WB share link (e.g. `'https://www.wildberries.ru/catalog/153372248/detail.aspx?targetUrl=GP&size=256419029'`)
 * @param wbProductShareUrl WB share link
 */
export default function extractIdFromProductShareLink(wbProductShareUrl: string): number {
	if (!wbProductShareUrl && !wbProductShareUrl.trim()) {
		throw new Error('Пустая строка');
	}

	let url: URL;
	try {
		url = new URL(wbProductShareUrl);
	} catch (e) {
		throw new Error('Некорректная ссылка');
	}

	const idStr = url.pathname.split('/').find((i) => Number(i));

	const id = Number.parseInt(idStr ?? '', 10);

	if (!Number.isNaN(id)) {
		return id;
	}

	throw new Error('Ссылка не содержит id товара');
}
