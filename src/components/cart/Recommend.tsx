import React, { useEffect, useMemo } from 'react';
import styles from './Recommend.module.css';
import { Title } from '../../ui/Title';
import { RecommendItem } from './RecommendItem';
import { getRecommendedItems } from '../../services/actions/cart-actions';
import { Loader } from '../../ui/Loader';
import { getValues } from '../../services/store';
import { useAppDispatch, useAppSelector } from '../../services/hooks';

interface RecommendProps {
    extraClass?: string;
}

export const Recommend: React.FC<RecommendProps> = ({ extraClass }) => {
    const dispatch = useAppDispatch();

    const { recommendedItems, recommendedItemsRequest } = useAppSelector(getValues);

    useEffect(() => {
        dispatch(getRecommendedItems());
    }, [dispatch]);

    const content = useMemo(() => {
        return recommendedItemsRequest ? (
        <Loader size="large" />
        ) : (
        recommendedItems.map((item, index) => {
            return <RecommendItem key={index} {...item} />;
        })
        );
    }, [recommendedItemsRequest, recommendedItems]);

    return (
        <section className={`${styles.container} ${extraClass}`}>
        <Title
            text="Обычно с этим покупают"
            amount={(recommendedItems && recommendedItems.length) || ''}
        />
        <div className={styles.items}>{content}</div>
        </section>
    );
};
