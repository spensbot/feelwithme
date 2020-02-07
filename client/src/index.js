import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import appReducer from './redux/reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import { BrowserRouter } from 'react-router-dom'
import ReduxThunk from 'redux-thunk'
//Custom
import App from './App'

ReactDOM.render(
    <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);