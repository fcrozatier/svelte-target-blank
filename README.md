# svelte-target-blank

Do you like to set `target="_blank"` on your external links but happen to forget sometimes?

Or maybe you have markdown files and it would be nice but cumbersome to set these attributes?

`svelte-target-blank` fixes all these external links and lets you know the corresponding files if you want / can edit the code.

## Get started

```sh
npm install -D svelte-target-blank
```

Then update your `svelte.config.js` file:

```js
import targetBlank from "svelte-target-blank";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  ...,
  preprocess: [
    vitePreprocess(),
    mdsvex(mdsvexOptions),
    targetBlank({ logLevel: 'warn', quietList: '/**/*.md' })
	],
  ...,
};

export default config;

```

If you use a markdown preprocessor like `mdsvex` above, put `svelte-target-blank` after it in the list. This way your external links in markdown files will be normalized too.

You're all set!

## Example

Now any external link in you markup

```html
<a href="https://external-ressource.com">check this out</a>
```

or in your markdown

```md
[check this out](https://external-ressource.com)
```

will be transformed into

```html
<a href="https://external-ressource.com" target="_blank">check this out</a>
```

with a message in the console:

```sh
svelte-target-blank found an external link with no 'target' attribute:
  file: /src/+page.svelte
  anchor: <a href="https://external-ressource">check this out</a>
```

## Options

`logLevel`: Let's you configure how verbose the preprocessor is

- `warn` (default) - Emit a console warning when a missing `target` is found
- `quiet` - Silently fix links

`quietList`: One or more glob patterns of locations to fix without emitting any warning. Ex: `"/**/*.md"`

## Licence

MIT
