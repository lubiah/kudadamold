/**
 *
 * @param {string} str1
 * @param {string} str2
 * @returns {{letter: string, cancelled: boolean}[]}
 */
export const cancelLetters = (str1, str2) => {
	// Create an empty result array
	let result = [];

	str1 = str1.toLowerCase().replace(/\s/g, "");
	str2 = str2.toLowerCase().replace(/\s/, "");

	// Create a set to store the characters in str2
	const str2Set = new Set(str2);

	// Loop through each character in str1
	for (let i = 0; i < str1.length; i++) {
		// Get the current character
		let char1 = str1[i];
		// Check if the character is in the set
		if (str2Set.has(char1)) {
			// If it is, remove it from the set
			str2Set.delete(char1);
			// Push an object to the result array with the letter and a "cancelled" flag set to true
			result.push({ letter: char1, cancelled: true });
		} else {
			// If it is not, push an object to the result array with the letter and a "cancelled" flag set to false
			result.push({ letter: char1, cancelled: false });
		}
	}

	// Return the result array
	return result;
};
