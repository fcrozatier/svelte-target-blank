# svelte-target-blank

Did you forget to set `target="_blank"` on some of your external links?

The Svelte preprocessor `svelte-target-blank` will help you fix the situation:

It will automatically fix all these external links for you and let you know which files the anchors were edited.


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
  preprocess: [vitePreprocess(), targetBlank({ mode: "warn" })], // Add it to the list
  ...,
};

export default config;

```

You're all set!

## Example

Now any external link

```html
<a href="https://external-ressource.com">check this out</a>
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

`mode`: Let's you configure how verbose the preprocessor is

- `warn` (default) - Emit a console warning when a missing `target` is found
- `silent` - Silently fix links
- `error` - Throw an error if there is any missing `target`


## Licence

MIT
