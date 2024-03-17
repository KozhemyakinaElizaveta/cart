import { useAppSelector } from '../../services/hooks';
import styles from './CheckoutAddress.module.css';

interface CheckoutProps {
    extraClass?: string;
}

export const CheckoutAddress: React.FC<CheckoutProps> = ({ extraClass }) => {
    const { deliveryForm, deliveryMethod } = useAppSelector(state => ({
        deliveryForm: state.delivery.deliveryForm,
        deliveryMethod: state.delivery.deliveryMethods.find(
        method => method.id === state.delivery.selectedDeliveryId
        )
    }));
    return (
        <ul className={`${styles.container} ${extraClass}`}>
        <li className={styles.textbox}>
            <h3 className={styles.title}>Информация о доставке:</h3>
            <p className={styles.text}>{deliveryForm.address}</p>
            <div className={styles.addressInfo}>
            <p className={styles.text}>
                <span className={styles.span}>Кв/офис: </span>
                {deliveryForm.unitNumber}
            </p>
            <p className={styles.text}>
                <span className={styles.span}>Домофон: </span>
                {deliveryForm.intercom}
            </p>
            <p className={styles.text}>
                <span className={styles.span}>Этаж: </span>
                {deliveryForm.floor}
            </p>
            </div>
            <p className={styles.text}>{deliveryForm.name}</p>
            <p className={styles.text}>{deliveryForm.phone}</p>
        </li>
        <li className={styles.textbox}>
            <h3 className={styles.title}>Выбранный тип доставки:</h3>
            <p className={styles.text}>{deliveryMethod.text}</p>
            <p className={styles.text}>{deliveryMethod.duration}</p>
        </li>
        </ul>
    );
};