import postcss from "postcss";
import CleanCSS from "clean-css";
import camelCase from "lodash/camelCase";
import upperFirst from "lodash/upperFirst";
const _ = { camelCase, upperFirst };

export const minifyCss = cssString =>
  new CleanCSS({ compatibility: "*" }).minify(cssString).styles;

export const cssToJs = (cssString, { cssToString = false } = {}) => {
  const root = postcss.parse(cssString, {});
  const rootRules = root.nodes.filter(node => node.type === "rule");

  if (!rootRules || rootRules.length < 1) {
    if (console) console.error("No CSS selectors found");
    return undefined;
  }

  return Object.entries(rootRules).reduce((acc, [key, { selector, nodes }]) => {
    const formatToObject = prop => {
      const camelProp = _.camelCase(prop);
      return prop.startsWith("-") ? _.upperFirst(camelProp) : camelProp;
    };
    const selectors = selector.split(",").map(s => s.trim());
    const cssDeclarations = nodes.filter(node => node.type === "decl");
    const cssDeclarationsFormatted = !!cssToString
      ? cssDeclarations.map(({ prop, value }) => `${prop}: ${value};`).join(" ")
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
    return { ...acc, ...valuePairs };
  }, {});
};

export default cssToJs;