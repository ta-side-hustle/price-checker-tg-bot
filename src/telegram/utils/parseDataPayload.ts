import { Exception, exception, Success, success } from 'exceptionally';
import { CallbackQueryPayload } from '../types/CallbackQueryPayload.js';

export default function parseDataPayload(data?: string): Exception<Error> | Success<CallbackQueryPayload> {
	const emptyException = new Error('empty callback payload');

	if (!data?.trim()) {
		return exception(emptyException);
	}

	try {
		const payload = JSON.parse(data);

		if (payload === undefined || payload === null) {
			return exception(emptyException);
		}

		return success(payload);
	} catch (e) {
		return exception(new Error('Json parse error'));
	}
}
