import { NEXT_STEP, PREVIOUS_STEP } from "../actions";

interface NextStepAction {
    type: typeof NEXT_STEP;
}

interface PreviousStepAction {
    type: typeof PREVIOUS_STEP;
}

export type TStepAction = NextStepAction | PreviousStepAction;

interface StepState {
    currentStep: 'cart' | 'delivery' | 'checkout';
}

const initialStepState: StepState = {
    currentStep: 'cart',
};

export const stepReducer = (state: StepState = initialStepState, action: TStepAction): StepState => {
    switch (action.type) {
        case NEXT_STEP: {
            return {
            currentStep:
                state.currentStep === 'cart'
                ? 'delivery'
                : state.currentStep === 'delivery'
                ? 'checkout'
                : 'checkout',
            };
        }
        case PREVIOUS_STEP: {
            return {
            currentStep:
                state.currentStep === 'cart'
                ? 'cart'
                : state.currentStep === 'delivery'
                ? 'cart'
                : 'delivery',
            };
        }
        default: {
            return state;
        }
    }
};