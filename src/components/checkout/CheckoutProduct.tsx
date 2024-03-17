import React from 'react';
import styles from './CheckoutProduct.module.css';

interface CheckoutProductProps {
    src: string;
    text: string;
    qty: number;
    extraClass?: string;
}

export const CheckoutProduct: React.FC<CheckoutProductProps> = ({ src, text, qty, extraClass = '' }) => {
    return (
        <div className={`${styles.product} ${extraClass}`}>
        <div className={styles.leftbox}>
            <img className={styles.img} src={src} alt="фото товара." />
            <p className={styles.text}>{text}</p>
        </div>
        <p className={styles.count}>×{qty}</p>
        </div>
    );
};
