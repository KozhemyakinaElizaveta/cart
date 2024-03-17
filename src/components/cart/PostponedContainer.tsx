import { useMemo } from 'react';
import styles from './PostponedContainer.module.css';
import { Postponed } from './Postponed';
import { getValues } from '../../services/store';
import { useAppSelector } from '../../services/hooks';

export const PostponedContainer = () => {
    const { postponed } = useAppSelector(getValues);

    const content = useMemo(
        () => {
        return postponed.map((item, index) => {
            return <Postponed key={index} {...item} />;
        });
        },
        [postponed]
    );

    return (
        <div className={styles.container}>
        {content}
        {!postponed.length && (
            <div className={styles.postponed}>
            <p className={styles.postponedMessageText}>Здесь пусто.</p>
            <p className={styles.postponedMessageText}>
                Вы можете добавить товары в список отложенных, перетащив их карточку из корзины сюда.
            </p>
            <p className={styles.postponedMessageText}>
                Положить их обратно в корзину можно аналогичным способом.
            </p>
            </div>
        )}
        </div>
    );
};