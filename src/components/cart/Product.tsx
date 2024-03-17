import React from 'react';
import { AmountButton } from '../../ui/AmountButton';
import { DeleteButton } from '../../ui/DeleteButton';
import styles from './Product.module.css';
import { DECREASE_ITEM, DELETE_ITEM, INCREASE_ITEM } from '../../services/actions/cart-actions';
import { priceFormat } from '../common/utils';
import { useDrag } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { getPromoDiscount } from '../../services/store';

interface ProductProps {
    src: string;
    id: number;
    text: string;
    qty: number;
    price: number;
}

export const Product: React.FC<ProductProps> = ({ src, id, text, qty, price }) => {
    const dispatch = useAppDispatch();
    const discount: number | null = useAppSelector(getPromoDiscount);
    const discountedPrice: string = ((price - price * ((discount ?? 0) / 100)) * qty).toFixed(0);

    const onDelete = () => {
        dispatch({
        type: DELETE_ITEM,
        id
        });
    };

    const decrease = () => {
        if (qty === 1) {
        onDelete();
        } else {
        dispatch({
            type: DECREASE_ITEM,
            id
        });
        }
    };

    const increase = () => {
        dispatch({
        type: INCREASE_ITEM,
        id
        });
    };

    const [{ opacity }, ref] = useDrag({
        type: 'items',
        item: { id },
        collect: monitor => ({
        opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    return (
        <div className={`${styles.product}`} style={{ opacity }}>
        <div ref={ref} className={styles.productBox}>
            <img className={styles.img} src={src} alt="фото товара." />
            <p className={styles.text}>{text}</p>
        </div>
        <div className={styles.amountbox}>
            <AmountButton onClick={decrease}>-</AmountButton>
            <p className={styles.amount}>{qty}</p>
            <AmountButton onClick={increase}>+</AmountButton>
        </div>
        <div className={styles.price}>
            <p className={`${styles.price} ${discount && styles.exPrice}`}>
            {priceFormat(price * qty)}
            </p>
            {discount !== null && <p className={styles.price}>{priceFormat(Number(discountedPrice))}</p>}
        </div>
        <DeleteButton onDelete={onDelete} />
        </div>
    );
};
