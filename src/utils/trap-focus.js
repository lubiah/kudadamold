/**
 * Traps focus inside an element
 * @param {HTMLElement} node
 */
export const trapFocus = (node) => {
	const FOCUSABLE_ELEMENTS_LIST = [
		'a[href]:not([disabled])',
		'button:not([disabled])',
		'textarea:not([disabled])',
		'input:not([disabled])',
		'select:not([disabled])'
	];
	const FOCUSABLE_ELEMENTS = node.querySelectorAll(FOCUSABLE_ELEMENTS_LIST.join(','));
	const FIRST_FOCUSABLE = FOCUSABLE_ELEMENTS[0];
	const LAST_FOCUSABLE = FOCUSABLE_ELEMENTS[FOCUSABLE_ELEMENTS.length - 1];

	/**
	 *
	 * @param {KeyboardEvent} event
	 */
	const trap = (event) => {
		let tabPressed = event.key === 'Tab';
		if (!tabPressed) return;

		if (event.shiftKey) {
			if (document.activeElement === FIRST_FOCUSABLE) {
				/** @ts-ignore */
				LAST_FOCUSABLE.focus();
				event.preventDefault();
			}
		} else {
			if (document.activeElement === LAST_FOCUSABLE) {
				/** @ts-ignore */
				FIRST_FOCUSABLE.focus();
				event.preventDefault();
			}
		}
	};

	return {
		/**Starts the trap */
		start: () => {
			node.addEventListener('keydown', trap);
			// @ts-ignore
			node?.firstElementChild?.focus();
		},

		destroy: () => {
			node.removeEventListener('keydown', trap);
		}
	};
};
