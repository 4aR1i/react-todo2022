import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './redux/store';

import App from './App';

import './scss/index.scss';

const elemRoot = document.getElementById('root');
if (elemRoot) {
  const root = ReactDOM.createRoot(elemRoot);
  root.render(
    <Provider store={store}>
      <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
    </Provider>
  );
}
