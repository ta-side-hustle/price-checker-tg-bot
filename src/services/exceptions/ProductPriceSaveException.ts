export default class ProductPriceSaveException extends Error {
	constructor(cause?: Error) {
		const message = 'Не удалось информацию о товаре товаре';
		super(message, { cause });

		this.name = this.constructor.name;

		Object.setPrototypeOf(this, new.target.prototype);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ProductPriceSaveException);
		}
	}
}
