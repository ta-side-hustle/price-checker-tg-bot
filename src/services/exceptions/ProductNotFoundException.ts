export default class ProductNotFoundException extends Error {
	constructor(cause?: Error) {
		const message = 'Товар не найден';
		super(message, { cause });

		this.name = this.constructor.name;

		Object.setPrototypeOf(this, new.target.prototype);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ProductNotFoundException);
		}
	}
}
