import addButton from './addButton.js';
import marketplaceButton from './marketplaceButton.js';
import nextPageButton from './nextPageButton.js';
import { detailsButton } from './detailsButton.js';
import removeButton from './removeButton.js';
import listButton from './listButton.js';
import previousPageButton from './previousPageButton.js';

const buttons = {
	add: addButton,
	details: detailsButton,
	remove: removeButton,
	list: listButton,
	previousPage: previousPageButton,
	nextPage: nextPageButton,
	marketplace: marketplaceButton,
} as const;

export default buttons;
export type { ProductButtonInfo } from './detailsButton.js';
