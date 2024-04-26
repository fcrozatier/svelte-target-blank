# svelte-target-blank

Did you forget to set `target="_blank"` somewhere on one of your external links?

`svelte-target-blank` is a little Svelte preprocessor to help with that.

It will automatically fix all these external links for you and let you know which files+anchors were edited.


## Get started

```sh
npm install -D svelte-target-blank
```

Then update your `svelte.config` file:

```js
import targetBlank from "svelte-target-blank";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  ...
	preprocess: [vitePreprocess(), targetBlank({ mode: "warn" })], // Add it to the list
};

export default config;

```

## Options

`mode`: Let's you configure how verbose the preprocessor is

- `warn` (default) -  Emit a console warning when a missing target is found
- `silent` - Silently fix links
- `error` - Throw an error


## Licence

MIT
