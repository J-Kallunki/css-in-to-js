import postcss from 'postcss';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
const _ = { camelCase, upperFirst };

export const minifyCss = cssString =>
  cssString
    .replace(/\r?\n|\r/g, '') // Remove line breaks
    .replace(/(\|\\r|\	|\\f|\\v)+/g, '') // Remove tabs etc.
    .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1') // Remove comments.
    .replace(/ +/g, ' ') // Remove redundant whitespace.
    .replace(/ *(:|;|{|}) */g, '$1'); // Remove spaces around those characters

export const cssToJs = (cssString, { cssToString = false } = {}) => {
  const root = postcss.parse(cssString, {});
  const rootRules =
    !!root && !!root.nodes && root.nodes.filter(node => node.type === 'rule');

  if (!rootRules || rootRules.length < 1) {
    if (console) console.error('No CSS selectors found');
    return undefined;
  }

  return Object.entries(rootRules).reduce((acc, [key, { selector, nodes }]) => {
    const formatToObject = prop => {
      const camelProp = _.camelCase(prop);
      return prop.startsWith('-') ? _.upperFirst(camelProp) : camelProp;
    };
    const selectors = !!selector ? selector.split(',').map(s => s.trim()) : [];
    const cssDeclarations = !!nodes
      ? nodes.filter(node => node.type === 'decl')
      : [];
    const cssDeclarationsFormatted = !!cssToString
      ? cssDeclarations.map(({ prop, value }) => `${prop}: ${value};`).join(' ')
      : cssDeclarations.reduce(
          (accDecl, { prop, value }) => ({
            ...accDecl,
            [formatToObject(prop)]: value
          }),
          {}
        );
    const valuePairs =
      selectors.length > 1
        ? selectors.reduce(
            (selectorsAcc, selectorsKey) => ({
              ...selectorsAcc,
              [selectorsKey]: cssDeclarationsFormatted
            }),
            {}
          )
        : { [selector]: cssDeclarationsFormatted };

    const mergedValuePairs = Object.entries(valuePairs).reduce(
      (mergedPairs, [key, value]) => {
        const mergeValue = valueKey =>
          !!cssToString
            ? `${acc[valueKey]}${value}`
            : { ...acc[valueKey], ...value };
        const mergedValue = acc.hasOwnProperty(key) ? mergeValue(key) : value;
        return { ...mergedPairs, [key]: mergedValue };
      },
      {}
    );

    return { ...acc, ...mergedValuePairs };
  }, {});
};

export default cssToJs;
