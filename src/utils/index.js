import { trapFocus } from './trap-focus';

export { trapFocus };

/**
 * Checks if a date is valid or not
 * @param {any} date
 * @returns {Boolean} Boolean
 */
export const validateDate = (date) => {
	let temp = new Date(date);
	return temp.toJSON() !== null;
};

/** Takes a string of HTML and make it safe to be rendered
 * @param {String} string - The string to be encoded
 * @returns {String} the encoded string
 */
export const encodeHtml = (string) => {
	return string.replace(/[\u00A0-\u9999<>&]/g, function (i) {
		return '&#' + i.charCodeAt(0) + ';';
	});
};

/**
 * Converts a string to snake-case format
 * @param {String} str
 * @returns {String} str
 */
export const snakeCase = (str) => {
	let snakecase =
		str &&
		str
			.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
			?.map((x) => x.toLowerCase())
			.join('_');
	return snakecase || str;
};

/**
 * Converts a string to kebab case
 * @param {String} str - The string to convert
 * @returns {String} string in kebab case format
 */
export const kebabCase = (str) => {
	const KEBAB_REGEX = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g;
	return str.replace(KEBAB_REGEX, function (match) {
		return '-' + match.toLowerCase();
	});
};

/**
 * Splits an array into equal chunks
 * @param {*[]} array - The array to split
 * @param {Number} size - The size of each array
 * @returns {*[]} The chunked array
 */
export const chunk = (array, size) => {
	const result = [];
	while (array.length) {
		result.push(array.splice(0, size));
	}
	return result;
};

/** Removes all casing from string
 * @param {string} string
 * @returns {string}
 */
export const noCase = (string) => {
	const hasSpace = /\s/;
	const hasSeparator = /(_|-|\.|:)/;
	const hasCamel = /([a-z][A-Z]|[A-Z][a-z])/;
	const separatorSplitter = /[\W_]+(.|$)/g;
	const camelSplitter = /(.)([A-Z]+)/g;

	/**
	 *
	 * @param {String} string
	 * @returns {String}
	 */
	const uncamelize = (string) => {
		return string.replace(camelSplitter, function (_m, previous, uppers) {
			return previous + ' ' + uppers.toLowerCase().split('').join(' ');
		});
	};

	/**
	 * @param {String} string
	 * @return {String}
	 */
	const unseparate = (string) => {
		return string.replace(separatorSplitter, function (_m, next) {
			return next ? ' ' + next : '';
		});
	};

	if (hasSpace.test(string)) return string.toLowerCase();
	if (hasSeparator.test(string)) return (unseparate(string) || string).toLowerCase();
	if (hasCamel.test(string)) return uncamelize(string).toLowerCase();
	return string.toLowerCase();
};

/**
 * forces a function to wait a certain amount of time before running again
 * @param func {Function} - The function to debounce
 * @param wait {Number} - The number of seconds to wait
 * @param immediate {Boolean} - Whether the function should be immediately called
 */
export const debounce = (func, wait = 300, immediate = true) => {
	/**@type {NodeJS.Timeout} */
	let timeout;
	/**@return @this {any} */
	return function executedFunction() {
		let context = this;
		let args = arguments;
		const later = () => {
			/**@ts-ignore */
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

/**
 * Debounce function based on window, doesn't require you to set
 * a wait timer
 * @param {Function} func - Function to debounce
 * @returns
 */
export const debounceWindow = (func) => {
	/** @type {Number} */
	let timeout;

	/** @return @this {any} */
	return function () {
		let context = this;
		let args = arguments;

		if (timeout) {
			window.cancelAnimationFrame(timeout);
		}

		timeout = window.requestAnimationFrame(function () {
			func.apply(context, args);
		});
	};
};

/**
 * Returns a random number
 * @param {Number} min
 * @param {Number} max
 * @returns {Number} - random number
 */
export const randomNumber = (min, max) => {
	min = Math.ceil(min);
	max = Math.ceil(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
