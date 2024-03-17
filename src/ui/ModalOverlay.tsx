import styles from './ModalOverlay.module.css';

interface ModalOverlayProps {
    extraClass?: string;
}

export const ModalOverlay: React.FC<ModalOverlayProps> = ({ extraClass }) => {
    return <div className={`${styles.overlay} ${extraClass}`} />;
};