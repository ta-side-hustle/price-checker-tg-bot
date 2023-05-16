import TelegramBot from 'node-telegram-bot-api';
import { setupLogger } from './commands/index.js';
import { callbackHandler, commandHandler } from './handlers/index.js';
import { environment } from '../utils/index.js';

function createBot(token: string): TelegramBot {
	return new TelegramBot(token, { polling: true });
}

export function setupCommands(bot: TelegramBot) {
	setupLogger(bot);
	commandHandler(bot);
	callbackHandler(bot);
}

const telegramToken = environment.TG_TOKEN;
const telegram = createBot(telegramToken);

export { telegram };
