export type CallbackQueryPayload = {
	/** Callback command type */
	cmd: 'add' | 'details' | 'remove' | 'list';

	/** Product id requested by details command */
	pId?: string;

	/** Page number requested by navigation button of list command */
	page?: number;
};
