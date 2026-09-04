import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          /**
           * Split the vendor libraries out of the app chunk.
           *
           * Everything shipped as one 500 kB file, so any copy change
           * invalidated React, the router, the motion library and the icon set
           * along with it. These four move on their own release cycles, not
           * ours, and now keep their own long-lived cache entries.
           *
           * Route-level splitting is deliberately not done here: the routes
           * are prerendered through `renderToString`, which does not wait on
           * lazy components, so a `React.lazy` boundary would serve crawlers a
           * fallback instead of the page.
           */
          manualChunks(id: string) {
            if (!id.includes('node_modules')) return undefined;
            if (id.includes('lucide-react')) return 'icons';
            if (id.includes('react-router')) return 'router';
            if (id.includes('motion')) return 'motion';
            if (
              id.includes('node_modules/react-dom') ||
              id.includes('node_modules/react/') ||
              id.includes('node_modules/scheduler')
            ) {
              return 'react';
            }
            return undefined;
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
