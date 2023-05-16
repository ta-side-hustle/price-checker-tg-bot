// @ts-expect-error incorrect lib export
import urlcat from 'urlcat';
import axios from 'axios';
import { exception, success } from 'exceptionally';
import type { ProductDetail, ProductPrice } from './types/index.js';

export async function fetchProductDetails(id: number) {
	const baseUrl = 'https://card.wb.ru';

	const url = urlcat(baseUrl, '/cards/detail', {
		appType: 1,
		curr: 'rub',
		dest: -1257786,
		regions: [
			80,
			64,
			38,
			4,
			115,
			83,
			33,
			68,
			70,
			69,
			30,
			86,
			75,
			40,
			1,
			66,
			48,
			110,
			31,
			22,
			71,
			114,
		],
		spp: 0,
		nm: id,
	});

	try {
		const response = await axios.get<ProductDetail>(url);
		return success(response.data);
	} catch (e) {
		return exception(e as Error);
	}
}

export async function fetchProductPrice(id: number) {
	const productDetail = await fetchProductDetails(id);

	if (productDetail.isException) {
		return productDetail;
	}

	const product = productDetail().data?.products?.at(0);

	if (!product) {
		return exception(new Error(`Товар с id ${id} не найден`));
	}

	const price: ProductPrice = {
		basePrice: product.priceU / 100,
		currentPrice: product.salePriceU / 100,
		salePercent: product.sale,
	};

	return success(price);
}
