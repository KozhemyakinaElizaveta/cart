import { orderCheckoutRequest } from '../fakeApi';
import { AppDispatch } from '../store';

export const ORDER_CHECKOUT_REQUEST = 'ORDER_CHECKOUT_REQUEST';
export const ORDER_CHECKOUT_SUCCESS = 'ORDER_CHECKOUT_SUCCESS';
export const ORDER_CHECKOUT_FAILED = 'ORDER_CHECKOUT_FAILED';

interface OrderCheckoutRequestAction {
    type: typeof ORDER_CHECKOUT_REQUEST;
}

interface OrderCheckoutFailedAction {
    type: typeof ORDER_CHECKOUT_FAILED;
}

interface OrderCheckoutSuccessAction {
    type: typeof ORDER_CHECKOUT_SUCCESS;
    order: any;
}

export type TCheckoutAction =
    | OrderCheckoutRequestAction
    | OrderCheckoutFailedAction
    | OrderCheckoutSuccessAction;

export function orderCheckout() {
    return function(dispatch: AppDispatch) {
        dispatch({
        type: ORDER_CHECKOUT_REQUEST
        });
        orderCheckoutRequest().then(res => {
        if (res && res.success) {
            dispatch({
            type: ORDER_CHECKOUT_SUCCESS,
            order: res.data
            });
        } else {
            dispatch({
            type: ORDER_CHECKOUT_FAILED
            });
        }
        });
    };
}