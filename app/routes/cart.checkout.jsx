import {redirect} from 'react-router';

const ADMIN_API_VERSION = '2024-04';

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

  console.log(
    '[cart.checkout] createDraftOrderInvoiceUrl params\n' +
      JSON.stringify(
        {
          cartId: cart.id,
          checkoutUrl: cart.checkoutUrl,
          buyerEmail: cart.buyerIdentity?.email || null,
          lineItems,
        },
        null,
        2,
      ),
  );

  const invoiceUrl = await createDraftOrderInvoiceUrl({
    env: context.env,
    cart,
    lineItems,
  });

  if (invoiceUrl) {
    return redirect(invoiceUrl, 303);
  }

  // Check if any line has a custom_price attribute.
  // If so, falling back to the standard Shopify checkout would show
  // the variant's base price instead of the custom price — causing a
  // subtotal mismatch. Redirect back to the cart so the customer isn't
  // charged an incorrect amount.
  const hasCustomPricing = (cart.lines?.nodes || []).some((line) =>
    (line?.attributes || []).some(
      (attr) => attr?.key === 'custom_price' && attr?.value,
    ),
  );

  if (hasCustomPricing) {
    console.error(
      '[cart.checkout] Draft order creation failed for cart with custom pricing. ' +
        'Refusing to fall back to standard checkout to avoid subtotal mismatch.',
    );
    return redirect('/cart?error=checkout', 303);
  }

  return redirect(fallbackCheckoutUrl || cart.checkoutUrl, 303);
}

/**
 * @param {{
 *   env: Env;
 *   cart: CartApiQueryFragment;
 *   lineItems: Array<{
 *     title: string;
 *     quantity: number;
 *     price: string;
 *     properties?: Array<{name: string; value: string}>;
 *   }>;
 * }} params
 */
async function createDraftOrderInvoiceUrl({env, cart, lineItems}) {
  const storeDomain = normalizeStoreDomain(getAdminShopDomain(env));
  const adminApiAccessToken = getAdminApiAccessToken(env);
  const privateAccessToken = getString(env.PRIVATE_ACCESS_TOKEN);

  console.log(
    '[cart.checkout] Admin env diagnostics\n' +
      JSON.stringify(
        {
          storeDomain,
          hasPrivateAccessToken: Boolean(privateAccessToken),
          privateAccessTokenPreview: maskSecret(privateAccessToken),
        },
        null,
        2,
      ),
  );

  if (!storeDomain || !adminApiAccessToken) {
    console.warn(
      '[cart.checkout] Missing admin shop domain or Admin API token; skipping draft order creation.',
    );
    return null;
  }

  const adminApiUrl = `https://${storeDomain}/admin/api/${ADMIN_API_VERSION}/draft_orders.json`;
  const payload = {
    draft_order: {
      line_items: lineItems,
      note: `Created from Hydrogen cart ${cart.id}`,
    },
  };

  if (cart.buyerIdentity?.email) {
    payload.draft_order.email = cart.buyerIdentity.email;
  }

  console.log(
    '[cart.checkout] draft_orders.json payload\n' +
      JSON.stringify(payload, null, 2),
  );

  try {
    const response = await fetch(adminApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': adminApiAccessToken,
      },
      body: JSON.stringify(payload),
    });

    const responsePayload = await response.json();
    if (!response.ok || responsePayload?.errors) {
      console.error('[cart.checkout] REST draft order request failed.', {
        status: response.status,
        errors: responsePayload?.errors,
        response: responsePayload,
      });
      return null;
    }

    return responsePayload?.draft_order?.invoice_url || null;
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
 * @param {string} value
 */
function maskSecret(value) {
  if (!value) return '';
  if (value.length <= 8) return '*'.repeat(value.length);
  return `${value.slice(0, 4)}...${value.slice(-4)}`;
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
        line?.merchandise?.product?.title &&
        !line?.parentRelationship?.parent?.id
      );
    })
    .map((line) => {
      const optionAttributes = (line?.merchandise?.selectedOptions || [])
        .filter((option) => option?.name && option?.value)
        .map((option) => ({
          name: option.name,
          value: option.value,
        }));

      const customAttributes = (line?.attributes || [])
        .filter(
          (attribute) =>
            attribute?.key &&
            attribute?.value &&
            attribute.key !== 'custom_price',
        )
        .map((attribute) => ({
          name: formatAttributeKey(attribute.key),
          value: attribute.value,
        }));

      return {
        title: line.merchandise.product.title,
        quantity: line.quantity,
        price: getLineItemPrice(line),
        properties: [...optionAttributes, ...customAttributes],
      };
    });
}

/**
 * @param {string} key
 */
function formatAttributeKey(key) {
  const explicitLabels = {
    header: 'Header',
    width: 'Single Panel Width(inch)',
    height: 'Single Panel Height (inch)',
    tie_backs: 'Tieback',
    memory_shaping: 'ShapeLock',
    room_label: 'Room Label',
  };

  if (explicitLabels[key]) {
    return explicitLabels[key];
  }

  return key
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * @param {CartApiQueryFragment['lines']['nodes'][number]} line
 */
function getLineItemPrice(line) {
  const customPriceAttribute = (line?.attributes || []).find(
    (attribute) => attribute?.key === 'custom_price' && attribute?.value,
  );
  const customPrice = Number(customPriceAttribute?.value);

  if (Number.isFinite(customPrice) && customPrice > 0) {
    return customPrice.toFixed(2);
  }

  return String(line?.cost?.amountPerQuantity?.amount || '0');
}

export default function CartCheckout() {
  return null;
}

/** @typedef {import('./+types/cart.checkout').Route} Route */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
