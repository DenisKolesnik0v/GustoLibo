import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import Checker from 'vite-plugin-checker';

export default defineConfig({
    plugins: [
        react(),
        Checker({ typescript: true }),
    ],
    resolve: {
        alias: {
            '@utils': path.resolve(__dirname, './src/utils'),
            '@models': path.resolve(__dirname, './src/utils/models'),
            '@components': path.resolve(__dirname, './src/components'),
            '@themecontext': path.resolve(__dirname, './src/context/ThemeContext.tsx'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@redux': path.resolve(__dirname, './src/redux'),
        },
    },
});
