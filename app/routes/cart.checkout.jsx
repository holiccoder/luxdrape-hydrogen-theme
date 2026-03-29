import {redirect} from 'react-router';

const ADMIN_API_VERSION = '2026-01';

const DRAFT_ORDER_CREATE_MUTATION = `
  mutation DraftOrderCreateForCheckout($input: DraftOrderInput!) {
    draftOrderCreate(input: $input) {
      draftOrder {
        id
        invoiceUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export function loader() {
  return redirect('/cart');
}

/**
 * @param {Route.ActionArgs}
 */
export async function action({request, context}) {
  let fallbackCheckoutUrl = '';
  let submittedCartId = '';

  try {
    const formData = await request.formData();
    fallbackCheckoutUrl = getString(formData.get('fallbackCheckoutUrl'));
    submittedCartId = getString(formData.get('cartId'));
  } catch {
    // Non-form POST requests can still continue using server-side cart data.
  }

  const cart = await context.cart.get();
  if (!cart?.id || !cart?.checkoutUrl) return redirect('/cart');

  if (submittedCartId && submittedCartId !== cart.id) {
    console.warn(
      '[cart.checkout] Submitted cartId does not match current cart cookie.',
    );
  }

  const lineItems = buildDraftOrderLineItems(cart.lines?.nodes || []);
  if (!lineItems.length) {
    return redirect(fallbackCheckoutUrl || cart.checkoutUrl, 303);
  }

  const invoiceUrl = await createDraftOrderInvoiceUrl({
    env: context.env,
    cart,
    lineItems,
  });

  if (invoiceUrl) {
    return redirect(invoiceUrl, 303);
  }

  return redirect(fallbackCheckoutUrl || cart.checkoutUrl, 303);
}

/**
 * @param {{
 *   env: Env;
 *   cart: CartApiQueryFragment;
 *   lineItems: Array<{variantId: string; quantity: number}>;
 * }} params
 */
async function createDraftOrderInvoiceUrl({env, cart, lineItems}) {
  const storeDomain = normalizeStoreDomain(getAdminShopDomain(env));
  const adminApiAccessToken = getAdminApiAccessToken(env);

  if (!storeDomain || !adminApiAccessToken) {
    console.warn(
      '[cart.checkout] Missing admin shop domain or Admin API token; skipping draft order creation.',
    );
    return null;
  }

  const adminApiUrl = `https://${storeDomain}/admin/api/${ADMIN_API_VERSION}/graphql.json`;
  const input = {
    lineItems,
    note: `Created from Hydrogen cart ${cart.id}`,
  };

  if (cart.buyerIdentity?.email) {
    input.email = cart.buyerIdentity.email;
  }

  try {
    const response = await fetch(adminApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': adminApiAccessToken,
      },
      body: JSON.stringify({
        query: DRAFT_ORDER_CREATE_MUTATION,
        variables: {input},
      }),
    });

    const payload = await response.json();
    if (!response.ok || payload?.errors?.length) {
      console.error('[cart.checkout] Admin API draft order request failed.', {
        status: response.status,
        errors: payload?.errors,
      });
      return null;
    }

    const createResult = payload?.data?.draftOrderCreate;
    if (createResult?.userErrors?.length) {
      console.error('[cart.checkout] draftOrderCreate returned user errors.', {
        userErrors: createResult.userErrors,
      });
      return null;
    }

    return createResult?.draftOrder?.invoiceUrl || null;
  } catch (error) {
    console.error('[cart.checkout] Failed to create draft order.', error);
    return null;
  }
}

/**
 * @param {unknown} value
 */
function getString(value) {
  return typeof value === 'string' ? value : '';
}

/**
 * @param {string | undefined} storeDomain
 */
function normalizeStoreDomain(storeDomain) {
  return (storeDomain || '').replace(/^https?:\/\//, '').replace(/\/$/, '');
}

/**
 * @param {Env} env
 */
function getAdminApiAccessToken(env) {
  return (
    env.PRIVATE_ACCESS_TOKEN ||
    env.private_access_token ||
    env.PRIVATE_ADMIN_API_ACCESS_TOKEN ||
    env.SHOPIFY_ADMIN_API_ACCESS_TOKEN ||
    env.ADMIN_API_ACCESS_TOKEN ||
    ''
  );
}

/**
 * @param {Env} env
 */
function getAdminShopDomain(env) {
  return (
    env.PRIVATE_ADMIN_SHOP_DOMAIN ||
    env.SHOPIFY_ADMIN_SHOP_DOMAIN ||
    env.SHOPIFY_STORE_DOMAIN ||
    env.PUBLIC_STORE_DOMAIN ||
    ''
  );
}

/**
 * @param {Array<CartApiQueryFragment['lines']['nodes'][number]>} lines
 */
function buildDraftOrderLineItems(lines) {
  return lines
    .filter((line) => {
      return (
        line?.quantity > 0 &&
        line?.merchandise?.id &&
        !line?.parentRelationship?.parent?.id
      );
    })
    .map((line) => ({
      variantId: line.merchandise.id,
      quantity: line.quantity,
    }));
}

export default function CartCheckout() {
  return null;
}

/** @typedef {import('./+types/cart.checkout').Route} Route */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
