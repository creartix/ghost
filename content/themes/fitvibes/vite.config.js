import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        outDir: 'assets/built',
        emptyOutDir: true,
        manifest: true,
        watch: {
            include: ['assets/**', '**/*.hbs']
        },
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'assets/css/main.css'),
                app: resolve(__dirname, 'assets/js/app.js')
            },
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js',
                assetFileNames: '[name].[ext]'
            }
        }
    },
    server: {
        port: 3000,
        strictPort: true,
        host: 'localhost',
        cors: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
        }
    }
});