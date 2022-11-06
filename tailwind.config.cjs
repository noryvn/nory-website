/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: "jit",
	darkMode: "class",
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			fontFamily: {
				abel: ["Abel", "sans-serif"]
			}
		}
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: ["winter", "night"]
	}
};
