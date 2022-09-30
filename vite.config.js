import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import electron, { onstart } from 'vite-plugin-electron'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src'),
        },
    },
    plugins: [
        react(),
        electron({
            main: {
                entry: 'electron/main/index.js',
                vite: {
                    build: {
                        outDir: 'dist/electron/main',
                    }
                },
            },
            preload: {
                input: {
                    // You can configure multiple preload scripts here
                    index: path.join(__dirname, 'electron/preload/index.js'),
                },
                vite: {
                    build: {
                        outDir: 'dist/electron/preload',
                    }
                },
            },

            // Enables use of Node.js API in the Electron-Renderer
            renderer: {},
        }),
    ]
})
