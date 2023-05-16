export default function formatAsRubbles(value: number): string {
	return Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		currencyDisplay: 'symbol',
	}).format(value);
}
