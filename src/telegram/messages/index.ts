import addMessages from './addMessages.js';
import detailsMessages from './detailsMessages.js';
import errorMessages from './errorMessages.js';
import listMessages from './listMessages.js';
import marketplaceMessages from './marketplaceMessages.js';

const messages = {
	...addMessages,
	...detailsMessages,
	...errorMessages,
	...listMessages,
	...marketplaceMessages,
} as const;

export default messages;
