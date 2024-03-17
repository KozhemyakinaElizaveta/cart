import React from 'react';
import styles from './RecommendItem.module.css';
import { MainButton } from '../../ui/MainButton';
import { priceFormat } from '../common/utils';

interface RecommendItemProps {
    src: string;
    price: number;
    text: string;
}

export const RecommendItem: React.FC<RecommendItemProps> = ({ src, price, text }) => {
    return (
        <article className={styles.article}>
        <img className={styles.img} src={src} alt="изображение товара." />
        <p className={styles.price}>{priceFormat(price)}</p>
        <p className={styles.text}>{text}</p>
        <MainButton type="button" extraClass={styles.button}>
            Добавить
        </MainButton>
        </article>
    );
};
