import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {createRoot} from 'react-dom/client';
// import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";

import App from "./component/app";
import {store} from "./service/hooks";

import './index.css';
import 'swiper/css/pagination';
import 'swiper/css';


const root = createRoot(document.getElementById('root') as HTMLElement);


if (!Array.prototype.isEmpty) {
    // eslint-disable-next-line
    Array.prototype.isEmpty = function isEmpty(): boolean {
        return this === undefined || this.length === 0;
    }
}

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

// reportWebVitals(console.log)
