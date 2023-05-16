import detailsKeyboard from './detailsKeyboard.js';
import listEmptyKeyboard from './listEmptyKeyboard.js';
import listKeyboard from './listKeyboard.js';
import emptyKeyboard from './emptyKeyboard.js';

const keyboards = {
	details: detailsKeyboard,
	listEmpty: listEmptyKeyboard,
	list: listKeyboard,
	empty: emptyKeyboard,
} as const;

export default keyboards;
