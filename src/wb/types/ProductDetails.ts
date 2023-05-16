type ProductDetailParams = {
	curr: string;
	spp: number;
	version: number;
};
type ProductDetailDataProductsExtended = {
	basicSale: number;
	basicPriceU: number;
};
type ProductDetailDataProductsColors = {
	name: string;
	id: number;
};
type ProductDetailDataProductsSizesStocks = {
	wh: number;
	qty: number;
	time1: number;
	time2: number;
};
type ProductDetailDataProductsSizes = {
	name: string;
	origName: string;
	rank: number;
	optionId: number;
	stocks: ProductDetailDataProductsSizesStocks[];
	time1: number;
	time2: number;
	wh: number;
	sign: string;
};
export type ProductDetailDataProducts = {
	id: number;
	root: number;
	kindId: number;
	subjectId: number;
	subjectParentId: number;
	name: string;
	brand: string;
	brandId: number;
	siteBrandId: number;
	supplierId: number;
	sale: number;
	priceU: number;
	salePriceU: number;
	logisticsCost: number;
	extended: ProductDetailDataProductsExtended;
	saleConditions: number;
	pics: number;
	rating: number;
	feedbacks: number;
	panelPromoId: number;
	promoTextCard: string;
	promoTextCat: string;
	volume: number;
	colors: ProductDetailDataProductsColors[];
	promotions: number[];
	sizes: ProductDetailDataProductsSizes[];
	diffPrice: boolean;
	time1: number;
	time2: number;
	wh: number;
};
type ProductDetailData = {
	products: ProductDetailDataProducts[];
};

export type ProductDetail = {
	state: number;
	params: ProductDetailParams;
	data: ProductDetailData;
};
