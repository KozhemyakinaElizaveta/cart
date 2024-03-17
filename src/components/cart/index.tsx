import React from 'react';
import { Tabs } from './Tabs';
import { ProductsContainer } from './ProductsContainer';
import { PostponedContainer } from './PostponedContainer';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { getCurrentTab } from '../../services/store';
import { useAppSelector } from '../../services/hooks';

export const Cart = () => {
    const currentTab = useAppSelector(getCurrentTab);
    return (
        <section>
        <DndProvider backend={HTML5Backend}>
            <Tabs />
            {currentTab === 'items' ? <ProductsContainer /> : <PostponedContainer />}
        </DndProvider>
        </section>
    );
};