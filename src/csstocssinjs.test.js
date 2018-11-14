import { expect } from 'chai';
import { cssToJs, minifyCss } from './csstocssinjs';

const css = `html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
}
/* Comments
========================================================================== */

/**
 * Another comment
 */
button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}`;

describe('csstocssinjs', () => {
  const resets = cssToJs(css);
  const resets2 = cssToJs(css, { cssToString: true });

  it('Should be converted to an object', () => {
    expect(resets).to.be.a('object');
    expect(resets2).to.be.a('object');
  })

  it('Should contain selectors', () => {
    const keys = Object.keys(resets);
    const keys2 = Object.keys(resets2);

    expect(keys).to.be.lengthOf(5);
    expect(keys2).to.be.lengthOf(5);

    expect(keys[3]).to.equal('[type="reset"]::-moz-focus-inner');
    expect(keys2[3]).to.equal('[type="reset"]::-moz-focus-inner');
  })

  it('Should contain declarations', () => {
    const values = resets['html'];
    const values2 = resets2['html'];

    expect(Object.keys(values)).to.be.lengthOf(2);
    expect(values['lineHeight']).to.equal('1.15');

    expect(values2).to.be.a('string');
    expect(values2).to.equal('line-height: 1.15; -webkit-text-size-adjust: 100%;');

  })

  it('Should need selector', () => {
    const noSelector = cssToJs(`line-height: 1.15; /* 1 */`);

    expect(noSelector).to.equal(undefined);
  })
});

describe('minifyCss', () => {
  const minify = minifyCss(css);

  it('Should still be a string', () => {
    expect(minify).to.be.a('string');
  })

});