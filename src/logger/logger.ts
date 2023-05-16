import { createLogger, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
// @ts-expect-error incorrect lib type export
import Axe from 'axe';
// @ts-expect-error incorrect lib type export
import Cabin from 'cabin';

const consoleTransport = new transports.Console({
	level: 'debug',
	stderrLevels: [
		'error',
	],
});

const fileTransport = (level: string, fileName?: string) => {
	const fileNameSuffix = fileName ? `-${fileName}` : '';

	return new DailyRotateFile({
		level,
		dirname: './logs',
		filename: `%DATE%${fileNameSuffix}`,
		extension: '.log',
		datePattern: 'YYYY-MM-DD',
		maxFiles: '31d',
	});
};

export const winston = createLogger({
	transports: [
		consoleTransport,
		fileTransport('info'),
		fileTransport('error', 'error'),
	],
});

const axe = new Axe({
	logger: winston,
});

export const cabin = new Cabin({
	logger: axe,
});
