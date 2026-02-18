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

        const result = await postcss([
            postcssPresetEnv({
                stage: 2,
                features: {
                    'cascade-layers': true, // Explicitly enable layer flattening
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
        console.log(`Successfully flattened and processed CSS. New size: ${transformedCss.length} bytes`);
    } catch (err) {
        console.error('Error flattening CSS:', err);
        process.exit(1);
    }
}
buildCss();
