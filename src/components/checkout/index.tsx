import React from 'react';
import styles from './Checkout.module.css';
import { CheckoutProduct } from './CheckoutProduct';
import { Modal } from './Modal';
import { CheckoutAddress } from './CheckoutAddress';
import { useAppSelector } from '../../services/hooks';
import { getOrder, getValues } from '../../services/store';

interface CheckoutProps {
    extraClass?: string;
}

export const Checkout: React.FC<CheckoutProps> = ({ extraClass }) => {
    const { items } = useAppSelector(getValues);
    const { order } = useAppSelector(getOrder);
    return (
        <section className={`${styles.container} ${extraClass}`}>
        <h3 className={styles.title}>Товары:</h3>
        {items.map((item, index) => {
            return <CheckoutProduct key={index} {...item} />;
        })}
        <CheckoutAddress extraClass={styles.address} />
        {!!order && !!order.id && <Modal number={order.id} />}
        </section>
    );
};