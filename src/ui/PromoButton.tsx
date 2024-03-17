import React from 'react';
import styles from './PromoButton.module.css';
import closeIcon from '../images/close.svg';
import { CANCEL_PROMO } from '../services/actions/cart-actions';
import { useDispatch } from 'react-redux';

interface PromoButtonProps {
    children: React.ReactNode;
    extraClass?: string;
}

export const PromoButton: React.FC<PromoButtonProps> = ({ children, extraClass = '' }: PromoButtonProps) => {
    const dispatch = useDispatch();

    const cancelPromo = () => {
        dispatch({ type: CANCEL_PROMO });
    };
    
    return (
        <button type="button" className={`${styles.button} ${extraClass}`} onClick={cancelPromo}>
        {children}
        <img className={styles.close} src={closeIcon} alt="кнопка закрытия" />
        </button>
    );
};
