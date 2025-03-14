import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import store from '../src/redux/store/store'; // Importa el store de Redux
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from 'react-query';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_CLIENT_ID

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    {/* Envuelve tu App con el Provider de Redux */}
    <Provider store={store}>
      <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Auth0Provider>
    </Provider>
  </React.StrictMode>,
  // document.getElementById('root')
);

// Si deseas comenzar a medir el rendimiento en tu aplicación, pasa una función
// para registrar los resultados (por ejemplo: reportWebVitals(console.log))
// o enviar a un punto final de análisis. Aprende más: https://bit.ly/CRA-vitals
reportWebVitals();
