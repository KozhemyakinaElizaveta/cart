import pic1 from '../images/prod-1.jpg';
import pic2 from '../images/prod-2.jpg';
import pic3 from '../images/prod-3.jpg';
import pic4 from '../images/prod-4.jpeg';
import rec1 from '../images/rec-1.png';
import rec2 from '../images/rec-2.png';
import rec3 from '../images/rec-3.png';
import rec4 from '../images/rec-4.png';

import delivery1 from '../images/express.svg';
import delivery2 from '../images/standart.svg';

interface Item {
    id: number;
    src: string;
    qty: number;
    text: string;
    price: number;
}

interface DeliveryMethod {
    thumb: string;
    id: number;
    text: string;
    duration: string;
    price: number;
}

interface RecommendedItem {
    src: string;
    price: number;
    text: string;
}

interface PromoCodes {
    [key: string]: number;
}

const title = { cart: 'Корзина', delivery: 'Доставка', checkout: 'Подтверждение заказа' };

export const getItemsRequest = async (): Promise<{ success: boolean; data: Item[] }> => {
    return await new Promise((resolve) =>
        setTimeout(() => {
        resolve({
            success: true,
            data: [
            {
                id: 1,
                src: pic1,
                qty: 1,
                text:
                'похожая на настоящую красный Мягкая приманка в виде червя силиконовый искусственный приманки рыбный запах креветок',
                price: 120,
            },
            {
                id: 2,
                src: pic2,
                qty: 1,
                text: 'Умное кольцо из нержавеющей стали с датчиком температуры тела, модный дисплей',
                price: 450,
            },
            {
                id: 3,
                src: pic3,
                qty: 1,
                text: 'Толстовка с капюшоном и принтом',
                price: 3933,
            },
            {
                id: 4,
                src: pic4,
                qty: 1,
                text: '50 шт., силиконовые рыболовные приманки, 45 мм, 0,4 г',
                price: 402,
            },
            ],
        });
        }, 1500)
    );
};

export const getDeliveryMethodsRequest = async (): Promise<{ success: boolean; data: DeliveryMethod[] }> => {
    return await new Promise((resolve) => {
        setTimeout(() => {
        resolve({
            success: true,
            data: [
            {
                thumb: delivery1,
                id: 1,
                text: 'Экспресс доставка',
                duration: '7-14 дней',
                price: 4000,
            },
            {
                thumb: delivery2,
                id: 2,
                text: 'Обычная доставка',
                duration: '30-45 дней',
                price: 0,
            },
            ],
        });
        }, 1500);
    });
};

export const getRecommendedItemsRequest = async (): Promise<{ success: boolean; data: RecommendedItem[] }> => {
    return await new Promise((resolve) =>
        setTimeout(() => {
        resolve({
            success: true,
            data: [
            {
                src: rec1,
                price: 640,
                text: 'Деревянная подушка в виде бревна, деревянная текстура пня для украшения',
            },
            {
                src: rec2,
                price: 480,
                text: 'Забавная 3D имитация, закусочный хлеб, мягкая подушка в форме поясницы',
            },
            {
                src: rec3,
                price: 960,
                text: '3D моделирование формы еды плюшевая подушка креативная курица колбаса',
            },
            {
                src: rec4,
                price: 360,
                text: 'Забавная Мужская футболка Роберт Паттинсон стоячий мем',
            },
            ],
        });
        }, 1500)
    );
};

const promoCodes: PromoCodes = {
    PROMO10: 10,
    PROMO15: 15,
    PROMO20: 20,
    PROMO666: 100,
};

export const applyPromoCodeRequest = async (code: string): Promise<{ success: boolean; discount: number }> => {
    const result = { success: true, discount: 0 };
    if (code in promoCodes) {
        result.discount = promoCodes[code];
    } else {
        result.success = false;
    }
    return await new Promise((resolve) =>
        setTimeout(() => {
        resolve(result);
        }, 1500)
    );
};

export const orderCheckoutRequest = async (): Promise<{ success: boolean; data: { id: number } }> => {
  const result = { success: true, data: { id: Math.floor(Math.random() * 1000) + 2033 } };

    return await new Promise((resolve) =>
        setTimeout(() => {
        resolve(result);
        }, 1500)
    );
};
