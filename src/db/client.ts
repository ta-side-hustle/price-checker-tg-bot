import { type Db, MongoClient } from 'mongodb';
import type { DatabaseName } from './types/index.js';
import { environment } from '../utils/index.js';

const host = environment.DB_HOSTNAME;
const user = environment.DB_USER;
const pass = environment.DB_PASSWORD;

const cs = `mongodb://${user}:${pass}@${host}`;

export const client = new MongoClient(cs);

export async function useClient<T = void>(func: (client: MongoClient) => Promise<T>) {
	try {
		// await client.connect();

		return await func(client);
	} finally {
		// await client.close();
	}
}

export async function useDatabase<T = void>(name: DatabaseName, func: (db: Db, client: MongoClient) => Promise<T>) {
	return useClient(async (client) => {
		const db = client.db(name);
		return func(db, client);
	});
}
