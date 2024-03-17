import React, { useCallback, useEffect, useRef, useMemo } from 'react';
import styles from './ProductsContainer.module.css';
import { Product } from './Product';
import { Input } from '../../ui/Input';
import { MainButton } from '../../ui/MainButton';
import { PromoButton } from '../../ui/PromoButton';
import { applyPromo, getItems } from '../../services/actions/cart-actions';
import { Loader } from '../../ui/Loader';
import { getValues } from '../../services/store';
import { useAppDispatch, useAppSelector } from '../../services/hooks';

export const ProductsContainer = () => {
    const dispatch = useAppDispatch();
    const {
        items,
        postponed,
        promoCode,
        promoDiscount,
        promoRequest,
        promoFailed,
        itemsRequest
    } = useAppSelector(getValues);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!items.length && !postponed.length) dispatch(getItems());
    }, [dispatch]);

    const applyPromoCode = useCallback(() => {
        if (inputRef.current && typeof inputRef.current.value === "string") {
            dispatch(applyPromo(inputRef.current.value));
        }
    }, [inputRef, dispatch]);

    const content = useMemo(() => {
        return itemsRequest ? (
            <Loader size="large" />
        ) : (
            items.map((item, index) => {
                return <Product key={index} {...item} />;
            })
        );
    }, [itemsRequest, items]);

    const promoCodeStatus = useMemo(() => {
        return promoFailed ? (
            <p className={styles.text}>Произошла ошибка! Проверьте корректность введенного промокода</p>
        ) : promoRequest ? (
            ''
        ) : !!promoCode && !!promoDiscount ? (
            <p className={styles.text}>Промокод успешно применён!</p>
        ) : (
            ''
        );
    }, [promoRequest, promoDiscount, promoFailed, promoCode]);

    return (
        <div className={`${styles.container}`}>
            {content}
            <div className={styles.promo}>
                <div className={styles.inputWithBtn}>
                    <Input
                        type="text"
                        placeholder="Введите промокод"
                        extraClass={styles.input}
                        inputWithBtn={true}
                        inputRef={inputRef}
                    />
                    <MainButton
                        type="button"
                        extraClass={styles.promo_button}
                        inputButton={true}
                        onClick={applyPromoCode}
                    >
                        {promoRequest ? <Loader size="small" inverse={true} /> : 'Применить'}
                    </MainButton>
                </div>
                {!!promoCode && !!promoDiscount && (
                    <PromoButton extraClass={styles.promocode}>{promoCode}</PromoButton>
                )}
            </div>
            {promoCodeStatus}
        </div>
    );
};
