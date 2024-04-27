import MagicString from "magic-string";
import { walk } from "estree-walker";
import { parse, type PreprocessorGroup } from "svelte/compiler";
import picomatch from "picomatch";

export type TargetBlankOptions = {
	mode: "warn" | "silent" | "error";
	/**
	 * Glob pattern string or strings of files to fix silently. Ex: "*.md"
	 */
	silentList?: string | string[];
};

export default (options: TargetBlankOptions = { mode: "warn" }) => {
	// By default no warning is silent
	const silent = options?.silentList
		? picomatch(options.silentList)
		: () => false;

	return {
		name: "Svelte Target Blank",
		markup: ({ content, filename }) => {
			// Only parse files containing AnchorElements
			if (!content.includes("<a ")) return { code: content };

			const markup = new MagicString(content, { filename });
			const ast = parse(content, { filename });

			walk(ast, {
				enter(node) {
					if (node.type === "Element" && node.name === "a") {
						const href = node.attributes.find((a) => a.name === "href");
						const target = node.attributes.find((a) => a.name === "target");

						// Match string literal in single or double quotes, with optional mustache tag and secure protocol
						const regex = /href={?['"]https?:\/\//;
						const hrefValue = markup.slice(href.start, href.end);
						const external = hrefValue.match(regex);

						if (external && !target) {
							const msg =
								"svelte-target-blank found an external link with no 'target' attribute:\n" +
								`\tfile: ${filename}\n` +
								`\tanchor: ${markup.slice(node.start, node.end)}\n`;
							String.prototype.match;

							if (options.mode === "warn" && !silent(filename ?? "")) {
								console.log("\x1b[33m%s\x1b[0m", msg);
							} else if (options.mode === "error") {
								throw new Error(msg);
							}

							markup.appendLeft(href.end, ' target="_blank"');
						}
					}
				},
			});

			return { code: markup.toString() };
		},
	} satisfies PreprocessorGroup;
};
