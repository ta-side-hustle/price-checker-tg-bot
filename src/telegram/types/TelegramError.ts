import type { IncomingMessage } from 'http';

type TelegramErrorResponseBody = { ok: boolean; error_code: number; description: string };

type IncomingMessageWithBody<T = TelegramErrorResponseBody | string> = IncomingMessage & { body: T };

export type TelegramFatalError = {
	code: 'EFATAL';
};

export type TelegramParseError = {
	code: 'EPARSE';
	response: IncomingMessageWithBody<string>;
};

export type TelegramServerError = {
	code: 'ETELEGRAM';
	response: IncomingMessageWithBody<TelegramErrorResponseBody>;
};

export type TelegramError = TelegramFatalError | TelegramParseError | TelegramServerError;
