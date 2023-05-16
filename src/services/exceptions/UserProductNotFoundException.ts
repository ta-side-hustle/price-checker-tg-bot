export default class UserProductNotFoundException extends Error {
	constructor(cause?: Error) {
		const message = 'Товары пользователя не найдены';
		super(message, { cause });

		this.name = this.constructor.name;

		Object.setPrototypeOf(this, new.target.prototype);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, UserProductNotFoundException);
		}
	}
}
