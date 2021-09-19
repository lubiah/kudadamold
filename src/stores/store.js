import { browser } from "$app/env";
import { writable } from "svelte/store";
export const mode = writable("light");


if (browser){
	let mode_value = localStorage.theme;
	mode.set(mode_value || "light");
	mode.subscribe(data => {
		localStorage.theme = data;
	})
}