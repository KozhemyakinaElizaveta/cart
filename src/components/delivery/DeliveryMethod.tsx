import { useEffect, useMemo } from 'react';
import styles from './DeliveryMethod.module.css';
import { DeliveryMethodOption } from './DeliveryMethodOption';
import { getRecommendedItems } from '../../services/actions/delivery-actions';
import { Loader } from '../../ui/Loader';
import { getDelivery } from '../../services/store';
import { useAppDispatch, useAppSelector } from '../../services/hooks';

export const DeliveryMethod = () => {
    const dispatch = useAppDispatch();

    useEffect(
        () => {
        dispatch(getRecommendedItems());
        },
        [dispatch]
    );

    const { deliveryMethods, deliveryMethodsRequest, selectedDeliveryId } = useAppSelector(getDelivery);

    const content = useMemo(
        () => {
        return deliveryMethodsRequest ? (
            <Loader size="large" />
        ) : (
            <ul className={styles.options}>
            {deliveryMethods.map((item, index) => {
                return (
                <DeliveryMethodOption
                    key={index}
                    {...item}
                    checked={item.id === selectedDeliveryId}
                />
                );
            })}
            </ul>
        );
        },
        [deliveryMethodsRequest, deliveryMethods, selectedDeliveryId]
    );
    return (
        <div className={`${styles.container}`}>
        <h3 className={styles.title}>Выберите способ доставки:</h3>
        {content}
        </div>
    );
};