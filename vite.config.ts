import { defineConfig } from 'vite'
import {  VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      injectRegister: 'auto', 
      manifest: {
        name: 'tiftt2024',
        short_name: 'TTT', 
        description: 'TIF Time Table',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'TTT_192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'TTT_512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'TTT_512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'TTT_512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
})
