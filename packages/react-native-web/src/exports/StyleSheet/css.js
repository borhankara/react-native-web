/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import createRuleBlock from './createRuleBlock';
import styleResolver from './styleResolver';

const systemFontStack =
  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif';

const css = {
  create(rules) {
    const result = {};
    Object.keys(rules).forEach(key => {
      const rule = rules[key];
      const font = rule.font;
      if (font && font.indexOf(' System') > -1) {
        rule.font = font.replace('System', systemFontStack);
      }
      if (rule.fontFamily === 'System') {
        rule.fontFamily = systemFontStack;
      }
      const cssRule = createRuleBlock(rule);
      const className = styleResolver.styleSheetManager.injectRule(key, cssRule);
      result[key] = className;
    });
    return result;
  }
};

export default css;
