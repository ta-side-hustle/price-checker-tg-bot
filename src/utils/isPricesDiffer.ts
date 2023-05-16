import type { ProductPriceEntity } from '../db/index.js';

type MinimalPriceShape = Pick<ProductPriceEntity, 'basePrice' | 'currentPrice'>;

const isDifferent = (any: number, latest: number): boolean => any !== latest;

export default function isPricesDiffer(any: MinimalPriceShape, latest: MinimalPriceShape): boolean {
	const isBaseDiffer = isDifferent(any.basePrice, latest.basePrice);
	const isCurrentDiffer = isDifferent(any.currentPrice, latest.currentPrice);

	return isBaseDiffer || isCurrentDiffer;
}
