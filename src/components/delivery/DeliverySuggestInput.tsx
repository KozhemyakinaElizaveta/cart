import React from 'react';
import { Input } from '../../ui/Input';
import { MainButton } from '../../ui/MainButton';
import styles from './Delivery.module.css';
import { useRef } from 'react';

interface MapSuggestComponentProps {
    onChange: (value: string) => void;
    value: string;
    mapRef: React.MutableRefObject<any>;
}

const MapSuggestComponent: React.FC<MapSuggestComponentProps> = ({ onChange, value, mapRef }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const onBlur = () => {
        onChange(inputRef.current?.value || '');
    };

    const onEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <>
            <Input
                type="text"
                placeholder="Введите адрес"
                inputWithBtn={true}
                value={value}
                extraClass={styles.input}
                onChange={onEdit}
                inputRef={inputRef}
                onBlur={onBlur}
                id="suggest"
            />
            <MainButton type="button" inputButton={true} onClick={onBlur}>
                Найти
            </MainButton>
            {/* Place any other content or logic related to the suggest input */}
        </>
    );
};

export default MapSuggestComponent;

