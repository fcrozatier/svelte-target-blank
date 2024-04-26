import MagicString from "magic-string";
import { walk } from "estree-walker";
import { parse, type PreprocessorGroup } from "svelte/compiler";

type Options = {
	mode: "warn" | "silent" | "error";
};

export default (options: Options = { mode: "warn" }) => {
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
							const msg = `
svelte-target-blank found an external link without a 'target' attribute:
\tfile: ${filename}
\tanchor: ${markup.slice(node.start, node.end)}
							`;
							if (options.mode === "warn") {
								console.warn(msg);
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
