export default class PriceNotFoundException extends Error {
	constructor(cause?: Error) {
		const message = 'У товара пока что нет цены';
		super(message, { cause });

		this.name = this.constructor.name;

		Object.setPrototypeOf(this, new.target.prototype);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, PriceNotFoundException);
		}
	}
}
