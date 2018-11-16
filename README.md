# @j-kallunki/css-in-to-js

Convert any CSS-string to styled-format object or object with CSS-declarations as strings.

[![travis build](https://img.shields.io/travis/J-Kallunki/css-in-to-js.svg?style=flat-square)](https://travis-ci.org/J-Kallunki/css-in-to-js)
[![codecov coverage](https://img.shields.io/codecov/c/github/J-Kallunki/css-in-to-js.svg?style=flat-square)](https://codecov.io/github/J-Kallunki/css-in-to-js)
[![version](https://img.shields.io/npm/v/@j-kallunki/css-in-to-js.svg?style=flat-square)](http://npm.im/@j-kallunki/css-in-to-js)
[![downloads](https://img.shields.io/npm/dm/@j-kallunki/css-in-to-js.svg?style=flat-square)](http://npm-stat.com/charts.html?package=@j-kallunki/css-in-to-js&from=2015-08-01)
[![Greenkeeper badge](https://badges.greenkeeper.io/J-Kallunki/css-in-to-js.svg)](https://greenkeeper.io/)
[![MIT License](https://img.shields.io/npm/l/@j-kallunki/css-in-to-js.svg?style=flat-square)](http://opensource.org/licenses/MIT)

Convert any CSS-string to Styled-format object or CSS-in-JS object with CSS-declarations as strings.

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
