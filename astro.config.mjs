// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	site: "https://www.recantoesabor.com",
	integrations: [
		sitemap({
			filter: (page) => new URL(page).pathname.replace(/\/$/, "") !== "/menu",
		}),
	],
	redirects: {
		"/menu": "/gallery",
	},
	output: "static",
	devToolbar: {
		enabled: false,
	},
});
