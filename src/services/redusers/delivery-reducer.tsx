import {
    GET_DELIVERY_METHODS,
    GET_DELIVERY_METHODS_FAILED,
    SET_DELIVERY_FORM_VALUE,
    SET_DELIVERY_METHOD,
    GET_DELIVERY_METHODS_SUCCESS,
    TDeliveryAction,
} from '../actions/delivery-actions';

interface DeliveryFormState {
    name: string;
    phone: string;
    address: string;
    unitNumber: string;
    intercom: string;
    floor: string;
}

interface DeliveryState {
    deliveryMethods: any[];
    deliveryMethodsRequest: boolean;
    deliveryMethodsFailed: boolean;
    selectedDeliveryId: string | null;
    deliveryForm: DeliveryFormState;
}

const deliveryInitialState: DeliveryState = {
    deliveryMethods: [],
    deliveryMethodsRequest: false,
    deliveryMethodsFailed: false,
    selectedDeliveryId: null,
    deliveryForm: {
        name: '',
        phone: '',
        address: '',
        unitNumber: '',
        intercom: '',
        floor: '',
    },
};

export const deliveryReducer = (state: DeliveryState = deliveryInitialState, action: TDeliveryAction): DeliveryState => {
    switch (action.type) {
        case GET_DELIVERY_METHODS: {
            return {
            ...state,
            deliveryMethodsFailed: false,
            deliveryMethodsRequest: true,
            };
        }
        case GET_DELIVERY_METHODS_FAILED: {
            return {
            ...state,
            deliveryMethodsFailed: true,
            deliveryMethodsRequest: false,
            };
        }
        case GET_DELIVERY_METHODS_SUCCESS: {
            return {
            ...state,
            deliveryMethods: action.methods,
            deliveryMethodsRequest: false,
            selectedDeliveryId:
                action.methods.length > 0 && state.selectedDeliveryId === null
                ? action.methods[0].id
                : state.selectedDeliveryId,
            };
        }
        case SET_DELIVERY_METHOD: {
            return {
            ...state,
            selectedDeliveryId: action.id,
            };
        }
        case SET_DELIVERY_FORM_VALUE: {
            return {
            ...state,
            deliveryForm: {
                ...state.deliveryForm,
                [action.field]: action.value,
            },
            };
        }
        default: {
            return state;
        }
    }
};