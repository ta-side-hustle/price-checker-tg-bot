export default class UserProductSaveException extends Error {
	constructor(cause?: Error) {
		const message = 'Не удалось сохранить информацию о товаре';
		super(message, { cause });

		this.name = this.constructor.name;

		Object.setPrototypeOf(this, new.target.prototype);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, UserProductSaveException);
		}
	}
}
