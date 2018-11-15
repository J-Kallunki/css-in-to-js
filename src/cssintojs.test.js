import { expect } from 'chai';
import { cssToJs, minifyCss } from './cssintojs';


describe('csstocssinjs', () => {
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

  describe('cssToJs', () => {
    const resets = cssToJs(css);
    const resets2 = cssToJs(css, { cssToString: true });

    it('Should be converted to an object', () => {
      expect(resets).to.be.a('object');
      expect(resets2).to.be.a('object');
    })

    it('Should contain selectors', () => {
      const selectors = Object.keys(resets);
      const selectors2 = Object.keys(resets2);

      expect(selectors).to.be.lengthOf(5);
      expect(selectors2).to.be.lengthOf(5);

      expect(selectors).to.include('html');
      expect(selectors2).to.include('html');
      expect(selectors[3]).to.equal('[type="reset"]::-moz-focus-inner');
      expect(selectors2[3]).to.equal('[type="reset"]::-moz-focus-inner');
    })

    it('Should contain declarations', () => {
      const declarations = resets['html'];
      const declarations2 = resets2['html'];

      expect(Object.keys(declarations)).to.be.lengthOf(2);
      expect(declarations['lineHeight']).to.equal('1.15');

      expect(declarations2).to.be.a('string');
      expect(declarations2).to.equal('line-height: 1.15; -webkit-text-size-adjust: 100%;');

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

});
