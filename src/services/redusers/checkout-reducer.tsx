import {
    ORDER_CHECKOUT_FAILED,
    ORDER_CHECKOUT_REQUEST,
    ORDER_CHECKOUT_SUCCESS,
    TCheckoutAction
} from '../actions/checkout-actions';

interface CheckoutState {
orderCheckoutFailed: boolean;
order: any | null;
orderCheckoutRequest: boolean;
}

const checkoutInitialState: CheckoutState = {
orderCheckoutFailed: false,
order: null,
orderCheckoutRequest: false
};

export const checkoutReducer = (state: CheckoutState = checkoutInitialState, action: TCheckoutAction): CheckoutState => {
    switch (action.type) {
        case ORDER_CHECKOUT_REQUEST: {
        return {
            ...state,
            orderCheckoutFailed: false,
            orderCheckoutRequest: true
        };
        }
        case ORDER_CHECKOUT_FAILED: {
        return {
            ...state,
            orderCheckoutFailed: true,
            orderCheckoutRequest: false
        };
        }
        case ORDER_CHECKOUT_SUCCESS: {
        return {
            ...state,
            order: action.order,
            orderCheckoutRequest: false
        };
        }
        default: {
        return state;
        }
    }
};