import { parentPort } from 'node:worker_threads';
import process from 'node:process';

export function signalJobDone() {
	if (parentPort) parentPort.postMessage('done');
	else process.exit(0);
}

export function signalJobError(error: unknown | Error) {
	if (error) {
		if (error instanceof Error) {
			throw Error;
		} else if (typeof error === 'string') {
			throw new Error(error);
		} else {
			throw new Error();
		}
	}

	if (parentPort) parentPort.postMessage('close');
	else process.exit(1);
}
