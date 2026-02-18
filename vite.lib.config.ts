import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        dts({
            insertTypesEntry: true,
            include: ['src/lib'],
            tsconfigPath: './tsconfig.lib.json'
        }),
    ],

    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/lib/index.ts'),
            name: 'SawabonaForms',
            formats: ['es', 'umd'],
            fileName: (format) => `sawabona-forms.${format}.js`,
        },
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                'framer-motion',
                'lucide-react',
                'react/jsx-runtime'
            ],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'framer-motion': 'Motion',
                    'lucide-react': 'Lucide',
                    'react/jsx-runtime': 'jsxRuntime'
                },
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === 'style.css' || assetInfo.name === 'styles.css' || assetInfo.name === 'forms.css') return 'sawabona-forms.css';
                    return assetInfo.name as string;
                },
            },
        },
        outDir: 'dist',
        emptyOutDir: true,
        cssTarget: 'chrome60',
        target: 'es2015',
    },
});
