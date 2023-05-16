export default class ProductSaveException extends Error {
	constructor(cause?: Error) {
		const message = 'Не удалось сохранить товар';
		super(message, { cause });

		this.name = this.constructor.name;

		Object.setPrototypeOf(this, new.target.prototype);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ProductSaveException);
		}
	}
}
