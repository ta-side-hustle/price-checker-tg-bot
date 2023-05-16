import { markdownv2 as format } from 'telegram-format';

const error = (error: string | Error = 'Что-то пошло не так'): string =>
	format.escape(error instanceof Error ? error.message : error);

const errorMessages = {
	error,
} as const;

export default errorMessages;
