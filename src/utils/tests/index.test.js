import { describe, test, expect } from "vitest";
import * as utils from "$utils";

describe("Testing the fnctions in the `$utils` folder", () => {
	test.todo("Write tests for trapFocus");

	test("Test `validateDate` function", () => {
		expect(utils.validateDate("2021-24-24")).toBeFalsy();
		expect(utils.validateDate("20-12-12")).toBeFalsy();
		expect(utils.validateDate("2024-12-24")).toBeTruthy();
		expect(utils.validateDate("helloworld")).toBeFalsy();
	});

	test("Test `snakeCase` function", () => {
		expect(utils.snakeCase("hello world")).toBe("hello_world");
		expect(utils.snakeCase("How are you")).toBe("how_are_you");
		expect(utils.snakeCase("helloworld")).toBe("helloworld");
		expect(utils.snakeCase("string")).toBe("string");
	});

	test.todo("Re-write `kebabCase` function");

	test("Test `chunk` function", () => {
		expect(utils.chunk([1, 2, 3, 4, 5, 6, 7], 2).length).toBe(4);
		expect(utils.chunk([1, 2, 3], 2)[0].length).toBe(2);
	});

	test("Test `noCase` function", () => {
		expect(utils.noCase("hello-world")).toBe("hello world");
		expect(utils.noCase("Hello_World")).toBe("hello world");
		expect(utils.noCase("helloWorld")).toBe("hello world");
	});

	test.todo("Write tests for `debounce` function");
	test.todo("Write tests for `debounceWindow` function");
});
