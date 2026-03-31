import {useLoaderData, data} from 'react-router';
import {CartForm} from '@shopify/hydrogen';
import {CartMain} from '~/components/CartMain';

const CART_MUTATION_RETRY_DELAYS_MS = [150, 350, 700];

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{title: `Hydrogen | Cart`}];
};

/**
 * @type {HeadersFunction}
 */
export const headers = ({actionHeaders}) => actionHeaders;

/**
 * @param {Route.ActionArgs}
 */
export async function action({request, context}) {
  const {cart} = context;

  const formData = await request.formData();

  const {action, inputs} = CartForm.getFormInput(formData);

  if (!action) {
    throw new Error('No action provided');
  }

  let status = 200;
  let result;

  switch (action) {
    case CartForm.ACTIONS.LinesAdd:
      result = await runCartMutationWithRetry(() => cart.addLines(inputs.lines));
      break;
    case CartForm.ACTIONS.LinesUpdate:
      result = await runCartMutationWithRetry(() =>
        cart.updateLines(inputs.lines),
      );
      break;
    case CartForm.ACTIONS.LinesRemove:
      result = await runCartMutationWithRetry(() =>
        cart.removeLines(inputs.lineIds),
      );
      break;
    case CartForm.ACTIONS.DiscountCodesUpdate: {
      const formDiscountCode = inputs.discountCode;

      // User inputted discount code
      const discountCodes = formDiscountCode ? [formDiscountCode] : [];

      // Combine discount codes already applied on cart
      discountCodes.push(...inputs.discountCodes);

      result = await runCartMutationWithRetry(() =>
        cart.updateDiscountCodes(discountCodes),
      );
      break;
    }
    case CartForm.ACTIONS.GiftCardCodesAdd: {
      const formGiftCardCode = inputs.giftCardCode;

      const giftCardCodes = formGiftCardCode ? [formGiftCardCode] : [];

      result = await runCartMutationWithRetry(() =>
        cart.addGiftCardCodes(giftCardCodes),
      );
      break;
    }
    case CartForm.ACTIONS.GiftCardCodesRemove: {
      const appliedGiftCardIds = inputs.giftCardCodes;
      result = await runCartMutationWithRetry(() =>
        cart.removeGiftCardCodes(appliedGiftCardIds),
      );
      break;
    }
    case CartForm.ACTIONS.BuyerIdentityUpdate: {
      result = await runCartMutationWithRetry(() =>
        cart.updateBuyerIdentity({
          ...inputs.buyerIdentity,
        }),
      );
      break;
    }
    default:
      throw new Error(`${action} cart action is not defined`);
  }

  const cartId = result?.cart?.id;
  const headers = cartId ? cart.setCartId(result.cart.id) : new Headers();
  const {cart: cartResult, errors, warnings} = result;

  const redirectTo = formData.get('redirectTo') ?? null;
  if (typeof redirectTo === 'string') {
    status = 303;
    headers.set('Location', redirectTo);
  }

  return data(
    {
      cart: cartResult,
      errors,
      warnings,
      analytics: {
        cartId,
      },
    },
    {status, headers},
  );
}

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({context}) {
  const {cart} = context;
  return await cart.get();
}

async function runCartMutationWithRetry(mutation) {
  for (let attempt = 0; attempt <= CART_MUTATION_RETRY_DELAYS_MS.length; attempt++) {
    try {
      return await mutation();
    } catch (error) {
      if (
        attempt === CART_MUTATION_RETRY_DELAYS_MS.length ||
        !isThrottleError(error)
      ) {
        throw error;
      }

      await wait(CART_MUTATION_RETRY_DELAYS_MS[attempt]);
    }
  }
}

function isThrottleError(error) {
  if (!error) return false;

  const message =
    typeof error === 'string'
      ? error
      : error instanceof Error
        ? error.message
        : JSON.stringify(error);

  return /throttled/i.test(message);
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Cart() {
  /** @type {LoaderReturnData} */
  const cart = useLoaderData();

  return (
    <div className="cart cart-page">
      <h1 className="cart-page-title">Your Cart</h1>
      <CartMain layout="page" cart={cart} />
    </div>
  );
}

/** @typedef {import('react-router').HeadersFunction} HeadersFunction */
/** @typedef {import('./+types/cart').Route} Route */
/** @typedef {import('@shopify/hydrogen').CartQueryDataReturn} CartQueryDataReturn */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof action>} ActionReturnData */
