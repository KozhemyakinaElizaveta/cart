import React from 'react';
import styles from './Title.module.css';

interface TitleProps {
    text: string;
    currentStep?: number;
    allSteps?: number;
    amount?: number | string;
    extraClass?: string;
}

export const Title: React.FC<TitleProps> = ({ text, currentStep, allSteps, amount, extraClass }) => {
    return (
        <header className={`${styles.header} ${extraClass}`}>
        <h2 className={styles.title}>{text}</h2>
        {currentStep && <p className={styles.steps}>{`Шаг ${currentStep} из ${allSteps}`}</p>}
        {amount && <p className={styles.steps}>{`${amount} товара`}</p>}
        </header>
    );
};
