import { expect } from 'chai';
import { cssToJs, minifyCss } from './cssintojs';

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

const cssRepeated = `
  button,
  input,
  select {
    margin: 0;
  }

  /**
   * 1. Show the overflow in IE.
   * 2. Remove the inheritance of text transform in Edge, Firefox, and IE.
   */

  button {
    overflow: visible; /* 1 */
    text-transform: none; /* 2 */
  }
`;

describe('csstocssinjs', () => {
  const resets = cssToJs(css);
  const resets2 = cssToJs(css, { cssToString: true });

  const resetsRepeated = cssToJs(cssRepeated);
  const resetsRepeated2 = cssToJs(cssRepeated, { cssToString: true });

  it('Should be converted to an object', () => {
    expect(resets).to.be.a('object');
    expect(resets2).to.be.a('object');
    expect(resetsRepeated).to.be.a('object');
    expect(resetsRepeated2).to.be.a('object');
  });

  it('Should contain selectors', () => {
    const keys = Object.keys(resets);
    const keys2 = Object.keys(resets2);
    const keysRepeated = Object.keys(resetsRepeated);
    const keysRepeated2 = Object.keys(resetsRepeated2);

    expect(keys).to.be.lengthOf(5);
    expect(keys2).to.be.lengthOf(5);
    expect(keysRepeated).to.be.lengthOf(3);
    expect(keysRepeated2).to.be.lengthOf(3);

    expect(keys[3]).to.equal('[type="reset"]::-moz-focus-inner');
    expect(keys2[3]).to.equal('[type="reset"]::-moz-focus-inner');
    expect(keysRepeated[0]).to.equal('button');
    expect(keysRepeated2[0]).to.equal('button');
  });

  it('Should contain declarations', () => {
    const values = resets['html'];
    const values2 = resets2['html'];
    const valuesRepeated = resetsRepeated['button'];
    const valuesRepeated2 = resetsRepeated2['button'];

    expect(Object.keys(values)).to.be.lengthOf(2);
    expect(values['lineHeight']).to.equal('1.15');

    expect(Object.keys(valuesRepeated)).to.be.lengthOf(3);
    expect(valuesRepeated['margin']).to.equal('0');
    expect(valuesRepeated['textTransform']).to.equal('none');

    expect(values2).to.be.a('string');
    expect(values2).to.equal(
      'line-height: 1.15; -webkit-text-size-adjust: 100%;'
    );
    expect(valuesRepeated2).to.be.a('string');
    expect(valuesRepeated2).to.equal(
      'margin: 0;overflow: visible; text-transform: none;'
    );
  });

  it('Should need selector', () => {
    const noSelector = cssToJs(`line-height: 1.15; /* 1 */`);

    expect(noSelector).to.equal(undefined);
  });
});

describe('minifyCss', () => {
  const minify = minifyCss(css);
  const minifyRepeated = minifyCss(cssRepeated);

  it('Should still be a string', () => {
    expect(minify).to.be.a('string');
    expect(minifyRepeated).to.be.a('string');
  });

  it('Should be certain length of a string', () => {
    expect(minify).to.have.lengthOf(208);
    expect(minifyRepeated).to.have.lengthOf(78);
  });
});
