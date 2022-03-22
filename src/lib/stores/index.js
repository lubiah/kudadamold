import { browser } from "$app/env";
import { writable } from "svelte/store";
export const theme = writable("light");


if (browser){
	let mode_value = localStorage.theme;
	theme.set(mode_value || "light");
	theme.subscribe(data => {
		localStorage.theme = data;
	})
}