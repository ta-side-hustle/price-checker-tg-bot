// @ts-expect-error dotenv-vault-core as of v0.7.0 has no typings
import * as dotenv from 'dotenv-vault-core';
import process from 'node:process';
import env from 'env-var';
import { secrets } from 'docker-secret';
import { Environment } from '../typings/types.js';

function loadDockerSecrets() {
	const secretsToEnvMap = new Map<string, string>([
		[
			'DOTENV_KEY_FILE',
			'DOTENV_KEY',
		],
		[
			'DB_HOSTNAME_FILE',
			'DB_HOSTNAME',
		],
		[
			'DB_USER_FILE',
			'DB_USER',
		],
		[
			'DB_PASSWORD_FILE',
			'DB_PASSWORD',
		],
	]);

	Array.from(secretsToEnvMap.entries()).forEach(
		([
			key,
			value,
		]) => {
			const secretFileName = env.get(key).asString();

			if (secretFileName === undefined) {
				return;
			}

			process.env[value] = secrets[secretFileName];
		}
	);
}

const envValidate = (): Environment => ({
	DB_HOSTNAME: env.get('DB_HOSTNAME').required().asString(),
	DB_USER: env.get('DB_USER').required().asString(),
	DB_PASSWORD: env.get('DB_PASSWORD').required().asString(),
	TG_TOKEN: env.get('TG_TOKEN').required().asString(),
	TG_OWNER_ID: env.get('TG_OWNER_ID').asIntPositive(),
	DOTENV_KEY: env.get('DOTENV_KEY').required().asString(),
});

function getEnvironment() {
	loadDockerSecrets();

	dotenv.config();

	return envValidate();
}

const environment = getEnvironment();

export default environment;
