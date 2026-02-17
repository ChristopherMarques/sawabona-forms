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
                'sonner',
                'react/jsx-runtime'
            ],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'framer-motion': 'Motion',
                    'lucide-react': 'Lucide',
                    'sonner': 'Sonner'
                },
            },
        },
        outDir: 'dist',
        emptyOutDir: true,
    },
});
