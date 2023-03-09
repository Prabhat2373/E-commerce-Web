import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store';
import { ToastContextProvider } from './features/Toast/ToastContext';
// import { ToastProvider } from './features/Toast/ToastProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ToastContextProvider>
        <App />
      </ToastContextProvider>
    </Provider>
  </BrowserRouter>
);

reportWebVitals();
