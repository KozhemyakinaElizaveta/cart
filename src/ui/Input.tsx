import React, { ChangeEvent, InputHTMLAttributes, RefObject, ChangeEventHandler } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    inputWithBtn?: boolean;
    extraClass?: string;
    inputRef?: RefObject<HTMLInputElement>;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const Input: React.FC<InputProps> = ({
    type,
    placeholder,
    inputWithBtn = false,
    extraClass = '',
    inputRef,
    value,
    onChange,
    ...props
    }) => {
    const className = `${styles.input} ${extraClass} ${inputWithBtn ? styles.input_withBtn : ''}`;
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
        onChange(event);
        }
    };

    return (
        <input
        type={type}
        className={className}
        placeholder={placeholder}
        ref={inputRef}
        value={value}
        onChange={handleChange}
        {...props}
        />
    );
};
