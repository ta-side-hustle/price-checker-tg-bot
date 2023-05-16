namespace NodeJS {
	interface ProcessEnv {
		DB_HOSTNAME: string;
		DB_USER: string;
		DB_PASSWORD: string;
		TG_TOKEN: string;
		TG_OWNER_ID?: string;
	}
}
