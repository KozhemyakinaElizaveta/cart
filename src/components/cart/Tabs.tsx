import styles from './Tab.module.css';
import { Tab } from './Tab';

export const Tabs = () => {
    return (
        <div className={`${styles.tabs}`}>
        <Tab text="Товары в корзине" tabName="items" />
        <Tab text="Отложенные товары" tabName="postponed" />
        </div>
    );
};