import { markdownv2 as format } from 'telegram-format';
import type TelegramBot from 'node-telegram-bot-api';
import type { TelegramError, TelegramFatalError, TelegramParseError, TelegramServerError } from '../types/TelegramError.js';
import { logger } from '../../logger/index.js';
import { environment } from '../../utils/index.js';

export const isTelegramError = (error: unknown): error is TelegramError => {
	const { code } = error as TelegramError;

	if (code === undefined) {
		return false;
	}

	switch (code) {
		case 'EFATAL':
		case 'EPARSE':
		case 'ETELEGRAM':
			return true;
		default:
			return false;
	}
};

export const isTelegramFatalError = (error: unknown | TelegramError): error is TelegramFatalError =>
	(error as TelegramError).code === 'EFATAL';

export const isTelegramParseError = (error: unknown | TelegramError): error is TelegramParseError =>
	(error as TelegramError).code === 'EPARSE';

export const isTelegramServerError = (error: unknown | TelegramError): error is TelegramServerError =>
	(error as TelegramError).code === 'ETELEGRAM';

export function composeMessage(error: unknown | TelegramError): string {
	if (isTelegramError(error)) {
		if (isTelegramFatalError(error)) {
			return `${error.code}`;
		}

		if (isTelegramParseError(error)) {
			return `${error.code}: ${error.response.body}`;
		}

		if (isTelegramServerError(error)) {
			return `${error.code}: (${error.response.body.error_code}) ${error.response.body.description}`;
		}
	}

	if (error instanceof Error) {
		return error.message;
	}

	return typeof error === 'string' ? error : `unknown error: ${JSON.stringify(error)}`;
}

async function reportError(errorMessage: string, bot: TelegramBot) {
	const myChatId = environment.TG_OWNER_ID;

	if (myChatId !== undefined) {
		await bot.sendMessage(myChatId, format.escape(errorMessage), { parse_mode: 'MarkdownV2' });
	}
}

export async function logError(error: unknown, bot?: TelegramBot) {
	const message = composeMessage(error);

	logger.info(message, error);

	if (bot) {
		await reportError(message, bot);
	}
}
