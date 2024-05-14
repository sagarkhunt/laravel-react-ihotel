import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/app.js',
                'resources/css/app.css',
                'resources/sass/app.scss',
            ],
            refresh: true,
        }),
        react(),
    ],
    // Specify your environment variables
    envDir: process.cwd(),
    envPrefix: 'REACT_APP_URL',
});
