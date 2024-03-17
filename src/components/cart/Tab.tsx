import React from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import {
    ADD_ITEM,
    ADD_POSTPONED_ITEM,
    TAB_SWITCH,
    DELETE_ITEM,
    DELETE_POSTPONED_ITEM
} from '../../services/actions/cart-actions';

import styles from './Tab.module.css';
import { getCurrentTab } from '../../services/store';
import { useAppDispatch, useAppSelector } from '../../services/hooks';

interface TabProps {
    text: string;
    tabName: string;
}

export const Tab: React.FC<TabProps> = ({ text, tabName }) => {
    const dispatch = useAppDispatch();
    const currentTab = useAppSelector(getCurrentTab);

    const switchTab = () => {
        dispatch({ type: TAB_SWITCH });
    };

    const movePostponedItem = (item: any) => {
        dispatch({
        type: ADD_ITEM,
        ...item
        });
        dispatch({
        type: DELETE_POSTPONED_ITEM,
        ...item
        });
    };

    const moveItem = (item: any) => {
        dispatch({
        type: ADD_POSTPONED_ITEM,
        ...item
        });
        dispatch({
        type: DELETE_ITEM,
        ...item
        });
    };

    const [{ isHover }, dropTarget] = useDrop({
        accept: tabName === 'items' ? 'postponed' : 'items',
        drop: (itemId: any) => {
        currentTab === 'items' ? moveItem(itemId) : movePostponedItem(itemId);
        },
        collect: (monitor: DropTargetMonitor) => ({
        isHover: monitor.isOver()
        })
    });

    const className = `${styles.tab} ${currentTab === tabName ? styles.tab_type_current : ''} ${
        isHover ? styles.onHover : ''
    }`;

    return (
        <div ref={dropTarget} className={className} onClick={switchTab}>
        {text}
        </div>
    );
};
