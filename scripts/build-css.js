import postcss from 'postcss';
import postcssPresetEnv from 'postcss-preset-env';
import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';

async function buildCss() {
    try {
        const cssPath = resolve('dist/sawabona-forms.css');
        console.log(`Reading CSS from ${cssPath}`);
        const css = await readFile(cssPath, 'utf-8');
        console.log(`Original CSS size: ${css.length} bytes`);

        const scope = '.sawabona-form-container';

        const scopedPlugin = {
            postcssPlugin: 'scoped-css',
            Root(root) {
                root.walkRules((rule) => {
                    // Ignore keyframes definitions
                    if (rule.parent && rule.parent.name && rule.parent.name.includes('keyframes')) {
                        return;
                    }

                    rule.selectors = rule.selectors.map((selector) => {
                        // If it's the scope itself, leave it
                        if (selector.trim() === scope) {
                            return selector;
                        }

                        // If it already starts with the scope, leave it (prevent double scoping)
                        if (selector.trim().startsWith(scope + ' ')) {
                            return selector;
                        }

                        // Handle :root, html, body -> map to scope
                        if ([':root', 'html', 'body'].some(s => selector.includes(s))) {
                            return selector.replace(/:root|html|body/g, scope);
                        }

                        // Handle universal selector *
                        // If it's just *, map to scope *
                        if (selector.trim() === '*') {
                            return `${scope} *`;
                        }

                        // For everything else, access it differently 
                        // Note: Tailwind v4 might output complex selectors like :where(...). 
                        // We simply prepend the scope.
                        return `${scope} ${selector}`;
                    });
                });
            },
        };
        // scopedPlugin.postcss = true; // Removed to avoid "i is not a function" error

        const result = await postcss([
            scopedPlugin,
            postcssPresetEnv({
                stage: 2,
                features: {
                    'cascade-layers': true,
                },
                browsers: 'chrome >= 60, firefox >= 54, safari >= 11, edge >= 79',
            })
        ]).process(css, { from: cssPath, to: cssPath });

        const transformedCss = result.css;

        if (transformedCss.includes('@layer')) {
            console.warn('WARNING: Transformed CSS still contains @layer directives!');
        } else {
            console.log('SUCCESS: @layer directives flattened.');
        }

        await writeFile(cssPath, transformedCss);
        console.log(`Successfully flattened and SCOPED CSS. New size: ${transformedCss.length} bytes`);
    } catch (err) {
        console.error('Error flattening CSS:', err);
        process.exit(1);
    }
}
buildCss();
