export default function isWbLink(url: string): boolean {
	const wbLinkRegex = /^(http(s)?:\/\/)?([www.]*wildberries.ru)/;
	return wbLinkRegex.test(url);
}
