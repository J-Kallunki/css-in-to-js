# @j-kallunki/css-in-to-js

[![Greenkeeper badge](https://badges.greenkeeper.io/J-Kallunki/css-in-to-js.svg)](https://greenkeeper.io/)

Convert any CSS-string to styled-format object or object with CSS-declarations as strings.

## Usage

```
yarn add @j-kallunki/css-in-to-js
OR
npm install --save @j-kallunki/css-in-to-js
```
```
import { cssToJs } from '@j-kallunki/css-in-to-js';
const cssObject = cssToJs(cssString);
```

## Settings

### `cssToString`

If you wan't to get CSS-declarations in CSS-string format use:
```
const cssObject = cssToJs(cssString, { cssToString: true })
```

## Tools

### `minifyCss()`

Minify CSS-string

## Acknowledgements

Uses [CleanCSS](https://github.com/jakubpawlowicz/clean-css) for cleaning/minifying the CSS and [PostCSS](https://github.com/postcss/postcss) for parsing the CSS.
