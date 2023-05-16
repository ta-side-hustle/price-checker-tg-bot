import Bree from 'bree';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import jobs from './jobs/index.js';
import { setupCommands, telegram } from './telegram/index.js';
import { jobLogger, logger } from './logger/index.js';
import { logError } from './telegram/handlers/index.js';

logger.info(`starting in ${process.env['NODE_ENV']} mode`);

setupCommands(telegram);

const bree = new Bree({
	logger: jobLogger,
	root: path.join(path.dirname(fileURLToPath(import.meta.url)), 'jobs'),
	jobs,
	defaultExtension: process.env['TS_NODE'] ? 'ts' : 'js',
	outputWorkerMetadata: false,
	workerMessageHandler: (message, workerMetadata) => logger.info(message, workerMetadata),
	errorHandler: (error, workerMetadata) => logger.error('job error', error, workerMetadata),
});

await bree.start();

logger.info('running');
await logError('app is running', telegram);
