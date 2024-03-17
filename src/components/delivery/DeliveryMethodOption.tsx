import React from 'react';
import { SET_DELIVERY_METHOD, TDeliveryAction } from '../../services/actions/delivery-actions';
import { priceFormat } from '../common/utils';
import styles from './DeliveryMethodOption.module.css';
import { useAppDispatch } from '../../services/hooks';

interface DeliveryMethodOptionProps {
    thumb: string;
    id: string;
    text: string;
    duration: number;
    price: number;
    checked: boolean;
}

export const DeliveryMethodOption: React.FC<DeliveryMethodOptionProps> = ({
    thumb,
    id,
    text,
    duration,
    price,
    checked,
    }) => {
    const dispatch = useAppDispatch();

    const onClick = () => {
        dispatch({ type: SET_DELIVERY_METHOD, id } as TDeliveryAction);
    };

    return (
        <li className={`${styles.option} ${checked && styles['option-checked']} `}>
        <input
            name="method"
            type="radio"
            id={id}
            className={styles.input}
            checked={checked}
            onChange={onClick}
        />
        <label htmlFor={id}>
            <div className={styles.leftbox}>
            <img className={styles.img} src={thumb} alt="изображение способа доставки." />
            <p className={styles.text}>{text}</p>
            </div>
        </label>
        <p className={styles.duration}>{duration} дней</p>
        <p className={styles.price}>{priceFormat(price)}</p>
        </li>
    );
};
