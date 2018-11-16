# @j-kallunki/css-in-to-js
Convert any CSS-string to styled-format object or object with CSS-declarations as strings.

## Usage

```bash
yarn add @j-kallunki/css-in-to-js
OR
npm install --save @j-kallunki/css-in-to-js
```
```javascript
import { cssToJs } from '@j-kallunki/css-in-to-js';
const cssObject = cssToJs(cssString);
```

## Settings

### `cssToString`

If you wan't to get CSS-declarations in CSS-string format use:
```javascript
const cssObject = cssToJs(cssString, { cssToString: true })
```

## Tools

### `minifyCss()`

Minify CSS-string

## Acknowledgements

Uses [CleanCSS](https://github.com/jakubpawlowicz/clean-css) for cleaning/minifying the CSS and [PostCSS](https://github.com/postcss/postcss) for parsing the CSS.
