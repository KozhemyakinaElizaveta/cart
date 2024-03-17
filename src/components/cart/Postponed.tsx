import React from 'react';
import { DeleteButton } from '../../ui/DeleteButton';
import styles from './Postponed.module.css';
import { DELETE_POSTPONED_ITEM } from '../../services/actions/cart-actions';
import { priceFormat } from '../common/utils';
import { useDrag } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { TAppActions, getPromoDiscount } from '../../services/store';

interface PostponedProps {
    src: string;
    id: string;
    text: string;
    qty: number;
    price: number;
}

export const Postponed: React.FC<PostponedProps> = ({ src, id, text, qty, price }) => {
    const dispatch = useAppDispatch();
    const discount: number | null = useAppSelector(getPromoDiscount);
    const discountedPrice: string = ((price - (price * (discount ?? 0) / 100)) * qty).toFixed(0);

    const onDelete = () => {
        dispatch({
            type: DELETE_POSTPONED_ITEM,
            id
        } as TAppActions); 
    };

    const [{ opacity }, ref] = useDrag({
        type: 'postponed',
        item: { id },
        collect: monitor => ({
        opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    return (
        <div className={styles.postponed} style={{ opacity }}>
        <div ref={ref} className={styles.postponedBox}>
            <img className={styles.img} src={src} alt="фото товара." />
            <p className={styles.text}>{text}</p>
        </div>
        <div className={styles.price}>
            <p className={`${styles.price} ${discount ? styles.exPrice : ''}`}>
            {priceFormat(price * qty)}
            </p>
            {discount && <p className={styles.price}>{priceFormat(Number(discountedPrice))}</p>}
        </div>
        <DeleteButton onDelete={onDelete} />
        </div>
    );
};
