import React from 'react';
import styles from './AmountButton.module.css';

interface AmountButtonProps {
    children: React.ReactNode;
    extraClass?: string;
    onClick: () => void;
}

export const AmountButton: React.FC<AmountButtonProps> = ({ children, extraClass, onClick }) => {
    return (
        <button type="button" onClick={onClick} className={`${styles.button} ${extraClass}`}>
        {children}
        </button>
    );
};
