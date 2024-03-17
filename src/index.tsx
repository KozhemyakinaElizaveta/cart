import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { enhancer, rootReducer } from './services/store';
import { legacy_createStore as createStore} from 'redux';
import { YMaps } from 'react-yandex-maps';

export const store = createStore(rootReducer, enhancer);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <YMaps query={{ apikey: '1cd1beec-adee-4ecd-b6df-7f00e68ef82e' }}>
        <App />
      </YMaps>
    </Provider>
  </React.StrictMode>,
)
