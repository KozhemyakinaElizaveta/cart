import React from 'react';
import ReactDOM from 'react-dom';
import { ModalOverlay } from '../../ui/ModalOverlay';
import styles from './Modal.module.css';
import { priceFormat, totalPriceSelector } from '../common/utils';
import { useAppSelector } from '../../services/hooks';

interface ModalProps {
    number: string | number;
    extraClass?: string;
}

const modalRoot = document.getElementById('react-modals');

export const Modal: React.FC<ModalProps> = ({ number, extraClass = '' }) => {
    const totalPrice = useAppSelector(totalPriceSelector);

    return modalRoot
        ? ReactDOM.createPortal(
            <section className={`${styles.container} ${extraClass}`}>
            <div className={styles.modal}>
                <h2 className={styles.title}>Спасибо за заказ!</h2>
                <p className={styles.text}>Номер заказа:</p>
                <p className={styles.number}>{number}</p>
                <p className={styles.text}>Итоговая сумма:</p>
                <p className={styles.price}>{priceFormat(totalPrice)}</p>
            </div>
            <ModalOverlay />
            </section>,
            modalRoot
    ): null;
};
