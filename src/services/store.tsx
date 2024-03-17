import { ActionCreator, applyMiddleware, combineReducers, compose } from "redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { store } from "..";
import { TAction, cartReducer } from "./redusers/cart-reducers";
import { TStepAction, stepReducer } from "./redusers";
import { TDeliveryAction } from "./actions/delivery-actions";
import { deliveryReducer } from "./redusers/delivery-reducer";
import { checkoutReducer } from "./redusers/checkout-reducer";
import { TCheckoutAction } from "./actions/checkout-actions";


export const rootReducer = combineReducers({
    step: stepReducer,
    cart: cartReducer,
    delivery: deliveryReducer,
    checkout: checkoutReducer
});

export type TAppActions = TAction | TStepAction | TDeliveryAction | TCheckoutAction;

const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
export const enhancer = composeEnhancers(
    applyMiddleware(thunk)
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunkDispatch = ThunkDispatch<RootState, any, TAppActions>;
export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, RootState, any, TAppActions>
>;

export const getCurrentTab = (store: RootState) => store.cart.currentTab;
export const getValues = (store: RootState) => store.cart;
export const getPromoDiscount = (store: RootState) => store.cart.promoDiscount;
export const getAddress = (store: RootState) => store.delivery.deliveryForm.address;
export const getDelivery = (store: RootState) => store.delivery;
export const getStep = (store: RootState) => store.step.currentStep;
export const getOrder = (store: RootState) => store.checkout;