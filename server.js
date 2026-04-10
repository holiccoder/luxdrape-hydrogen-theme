import * as serverBuild from 'virtual:react-router/server-build';
import {createRequestHandler, storefrontRedirect} from '@shopify/hydrogen';
import {createHydrogenRouterContext} from '~/lib/context';

/**
 * Server-only env defaults injected by Vite at build time from .env.
 * The actual secret is in .env (gitignored), NOT in source code.
 * This file is part of the SSR bundle and is NEVER sent to the browser.
 *
 * @see vite.config.js `define` option
 */
const SERVER_ENV_DEFAULTS = {
  /* global __PRIVATE_ACCESS_TOKEN__ */
  PRIVATE_ACCESS_TOKEN:
    typeof __PRIVATE_ACCESS_TOKEN__ !== 'undefined'
      ? __PRIVATE_ACCESS_TOKEN__
      : '',
};

/**
 * Merge fallback env vars into the Oxygen env object.
 * Existing Oxygen-provided values always take precedence.
 * @param {Env} env
 * @returns {Env}
 */
function withServerEnvDefaults(env) {
  const merged = {...env};
  for (const [key, value] of Object.entries(SERVER_ENV_DEFAULTS)) {
    if (!merged[key]) {
      merged[key] = value;
    }
  }
  return merged;
}

/**
 * Export a fetch handler in module format.
 */
export default {
  /**
   * @param {Request} request
   * @param {Env} env
   * @param {ExecutionContext} executionContext
   * @return {Promise<Response>}
   */
  async fetch(request, env, executionContext) {
    try {
      // Apply server-only env defaults for vars Oxygen doesn't inject
      const resolvedEnv = withServerEnvDefaults(env);

      const hydrogenContext = await createHydrogenRouterContext(
        request,
        resolvedEnv,
        executionContext,
      );

      /**
       * Create a Hydrogen request handler that internally
       * delegates to React Router for routing and rendering.
       */
      const handleRequest = createRequestHandler({
        build: serverBuild,
        mode: process.env.NODE_ENV,
        getLoadContext: () => hydrogenContext,
      });

      const response = await handleRequest(request);

      if (hydrogenContext.session.isPending) {
        response.headers.set(
          'Set-Cookie',
          await hydrogenContext.session.commit(),
        );
      }

      if (response.status === 404) {
        /**
         * Check for redirects only when there's a 404 from the app.
         * If the redirect doesn't exist, then `storefrontRedirect`
         * will pass through the 404 response.
         */
        return storefrontRedirect({
          request,
          response,
          storefront: hydrogenContext.storefront,
        });
      }

      return response;
    } catch (error) {
      console.error(error);
      return new Response('An unexpected error occurred', {status: 500});
    }
  },
};
