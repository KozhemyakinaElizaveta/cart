import { useMemo } from 'react';
import { MainButton } from '../../ui/MainButton';
import styles from './TotalPrice.module.css';
import { NEXT_STEP, PREVIOUS_STEP } from '../../services/actions';
import { orderCheckout } from '../../services/actions/checkout-actions';
import { priceFormat, totalPriceSelector } from '../common/utils';
import { Loader } from '../../ui/Loader';
import { getOrder, getPromoDiscount, getStep } from '../../services/store';
import { useAppDispatch, useAppSelector } from '../../services/hooks';

interface TotalPriceProps {
    step: 'cart' | 'delivery' | 'checkout';
}

export const TotalPrice: React.FC<TotalPriceProps> = ({ step }) => {
    const totalPrice = useAppSelector(totalPriceSelector);

    const discount = useAppSelector(getPromoDiscount);

    const { orderCheckoutRequest } = useAppSelector(getOrder);

    const price = discount ? totalPrice - totalPrice * (discount / 100) : totalPrice;
    const dispatch = useAppDispatch();
    const prev = () => {
        dispatch({
        type: PREVIOUS_STEP
        });
    };
    const next = () => {
        dispatch({
        type: NEXT_STEP
        });
    };

    const buttonText = useMemo(
        () => {
        if (step === 'delivery') {
            return 'Назад к списку покупок';
        } else if (step === 'checkout') {
            return 'Назад к выбору доставки';
        } else {
            return '';
        }
        },
        [step]
    );

    const confirmOrder = () => {
        dispatch(orderCheckout());
    };

    const nextAction = step === 'delivery' || step === 'cart' ? next : confirmOrder;
    const submitButtonText = step === 'checkout' ? 'Оформить заказ' : 'Продолжить оформление';

    return (
        <div className={`${styles.container}`}>
        <p className={styles.text}>Итого:</p>
        <p className={styles.cost}>{priceFormat(price)}</p>
        <div className={styles.buttonbox}>
            {(step === 'delivery' || step === 'checkout') && (
            <MainButton onClick={prev} type="button" secondary={true} extraClass={styles.button}>
                {buttonText}
            </MainButton>
            )}
            <MainButton onClick={nextAction} type="button">
            {orderCheckoutRequest ? <Loader size="small" inverse={true} /> : submitButtonText}
            </MainButton>
        </div>
        </div>
    );
};