import type TelegramBot from 'node-telegram-bot-api';
import { reply } from '../utils/index.js';
import { isWbLink } from '../../wb/utils/index.js';
import { handleAddCommand, handleListCommand, handleStartCommand } from '../commands/index.js';
import messages from '../messages/index.js';

export default function commandHandler(bot: TelegramBot) {
	bot.onText(/\/start/, async (msg) => {
		await handleStartCommand(bot, msg);
	});

	// eslint-disable-next-line no-useless-escape
	const anyUrlRegex = /^(http[s]?:\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
	bot.onText(anyUrlRegex, async (msg, match) => {
		if (!match) {
			await reply(bot, msg, messages.addPrompt());
			return;
		}

		const url = match.input;

		if (!isWbLink(url)) {
			await reply(bot, msg, messages.marketplaceUnsupported());
			return;
		}

		await handleAddCommand(bot, msg, url);
	});

	bot.onText(/\/list/, async (msg) => {
		await handleListCommand(bot, msg, 1);
	});
}
