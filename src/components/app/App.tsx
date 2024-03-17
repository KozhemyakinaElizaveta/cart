import React, { useMemo } from 'react';
import styles from './App.module.css';
import { Title } from '../../ui/Title';
import { Cart } from '../cart';
import { Delivery } from '../delivery';
import { Checkout } from '../checkout';
import { Recommend } from '../cart/Recommend';
import { TotalPrice } from '../common/TotalPrice';
import { useAppSelector } from '../../services/hooks';
import { getStep } from '../../services/store';

interface AppProps {}

const title: { [key: string]: string } = {
  cart: 'Корзина',
  delivery: 'Доставка',
  checkout: 'Подтверждение заказа'
};

const App: React.FC<AppProps> = () => {
  const step = useAppSelector(getStep);

  const content = useMemo(() => {
    switch (step) {
      case 'cart': {
        return <Cart />;
      }
      case 'delivery': {
        return <Delivery />;
      }
      case 'checkout': {
        return <Checkout />;
      }
      default: {
        return <Cart />;
      }
    }
  }, [step]);

  return (
    <div className={styles.app}>
      <Title
        text={title[step]}
        currentStep={Object.keys(title).indexOf(step) + 1}
        allSteps={Object.keys(title).length}
      />
      {content}
      <TotalPrice step={step} />
      {step === 'cart' && <Recommend extraClass={styles.recommend} />}
    </div>
  );
};

export default App;
