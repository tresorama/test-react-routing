import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { RouteProvider } from './router/router';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouteProvider>
      <App />
    </RouteProvider>
  </React.StrictMode>,
);
