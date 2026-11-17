import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

function contentSecurityPolicy(): Plugin {
  return {
    name: 'portfolio-content-security-policy',
    apply: 'build',
    transformIndexHtml() {
      return [{
        tag: 'meta',
        attrs: {
          'http-equiv': 'Content-Security-Policy',
          content: [
            "default-src 'self'",
            "script-src 'self'",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data:",
            "object-src 'none'",
            "base-uri 'none'",
            "form-action 'none'",
            "frame-src 'none'",
            "connect-src 'self'",
          ].join('; '),
        },
        injectTo: 'head-prepend',
      }]
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), contentSecurityPolicy()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        ladder: resolve(import.meta.dirname, 'ladder-simulator/index.html'),
      },
    },
  },
})
