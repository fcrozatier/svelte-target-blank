import { expect, test } from "vitest";
import preprocess from "../src/index";

const { markup } = preprocess({ mode: "silent" });

test.each([
	[
		"https",
		'<a href="https://svelte.dev">link</a>',
		'<a href="https://svelte.dev" target="_blank">link</a>',
	],
	[
		"http",
		'<a href="http://svelte.dev">link</a>',
		'<a href="http://svelte.dev" target="_blank">link</a>',
	],
	[
		"mustache",
		'<a href={"https://svelte.dev"}>link</a>',
		'<a href={"https://svelte.dev"} target="_blank">link</a>',
	],
	[
		"noop",
		'<a href="https://svelte.dev" target="_blank">link</a>',
		'<a href="https://svelte.dev" target="_blank">link</a>',
	],
	[
		"concat",
		'<a href={"https://" + baseUrl}>link</a>',
		'<a href={"https://" + baseUrl} target="_blank">link</a>',
	],
])("works with %s", (name, before, after) => {
	expect(markup({ content: before }).code).toBe(after);
});
