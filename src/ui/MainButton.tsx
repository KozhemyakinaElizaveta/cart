import React, { ReactNode, MouseEvent } from 'react';
import styles from './MainButton.module.css';

interface MainButtonProps {
    type: "button" | "submit" | "reset" | undefined;
    children: ReactNode;
    extraClass?: string;
    inputButton?: boolean;
    secondary?: boolean;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const MainButton: React.FC<MainButtonProps> = ({
    type,
    children,
    extraClass = '',
    inputButton = false,
    secondary = false,
    onClick
}: MainButtonProps) => {
    const className = `${styles.button} ${extraClass} ${inputButton ? styles.input : ''} ${
        secondary ? styles.secondary : ''
    }`;
    return (
        <button onClick={onClick} type={type} className={className}>
        {children}
        </button>
    );
};
