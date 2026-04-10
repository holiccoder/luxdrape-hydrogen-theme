import {defineConfig, loadEnv} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {oxygen} from '@shopify/mini-oxygen/vite';
import {reactRouter} from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({mode}) => {
  // Load all env vars from .env at build time (not just VITE_ prefixed ones)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      hydrogen(),
      oxygen(),
      reactRouter(),
      tailwindcss(),
      tsconfigPaths(),
    ],
    build: {
      // Allow a strict Content-Security-Policy
      // without inlining assets as base64:
      assetsInlineLimit: 0,
    },
    // Inject server-only env vars at build time.
    // These are baked into the SSR bundle and never exposed to the client.
    // The actual values come from .env (gitignored), not source code.
    define: {
      __PRIVATE_ACCESS_TOKEN__: JSON.stringify(env.PRIVATE_ACCESS_TOKEN || ''),
    },
    ssr: {
      optimizeDeps: {
        /**
         * Include dependencies here if they throw CJS<>ESM errors.
         * For example, for the following error:
         *
         * > ReferenceError: module is not defined
         * >   at /Users/.../node_modules/example-dep/index.js:1:1
         *
         * Include 'example-dep' in the array below.
         * @see https://vitejs.dev/config/dep-optimization-options
         */
        include: ['set-cookie-parser', 'cookie', 'react-router'],
      },
    },
    server: {
      allowedHosts: ['.tryhydrogen.dev', 'luxdrape.com'],
    },
  };
});
