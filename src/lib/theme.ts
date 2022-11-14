import { writable } from "svelte/store";
import { browser } from "$app/environment";
import { LOCAL_STORAGE } from "$lib/constant";

export const themes = {
	light: "winter",
	dark: "night"
};
export type Theme = keyof themes;
export const theme = writable<Theme>("light");

function getDefaultTheme(): Theme {
	const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	if (dark) {
		return "dark";
	}
	return "light";
}

if (browser) {
	const themeUsed = localStorage.getItem(LOCAL_STORAGE.THEME) ?? getDefaultTheme();
	theme.set(themeUsed);
	theme.subscribe(($theme) => {
		document.body.setAttribute("data-theme", themes[$theme]);
		localStorage.setItem(LOCAL_STORAGE.THEME, $theme);
	});
}
