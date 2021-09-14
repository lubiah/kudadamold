export function random_int(min, max) {
	var minimum = Math.ceil(min);
	var maximum = Math.floor(max);
	return Math.floor(Math.random() * (maximum - minimum) + minimum);
}

function is_even(number) {
	if (number % 2 == 0) return true;
	else return false;
}

export function output_type_changer(output_type, number, min_number, max_number) {
	switch (output_type) {
		case 'even':
			if (is_even(number)) {
				return number;
			} else {
				if (number + 1 <= max_number) {
					return number + 1;
				} else if (number - 1 >= min_number) {
					return number - 1;
				} else {
					return number;
				}
			}
			break;

		case 'odd':
			if (!is_even(number)) {
				return number;
			} else {
				if (number + 1 <= max_number) {
					return number + 1;
				} else if (number - 1 >= min_number) {
					return number - 1;
				} else {
					return number;
				}
			}
			break;
		case 'normal':
		default:
			return number;
			break;
	}
}
