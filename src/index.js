import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

// COMPONENT & OTHER
import "./assets/scss/index.scss"
import 'antd/dist/antd.css';

// REDUX
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import Main from './base/main';
import * as defaults from "./helper/defaults"

// SET REDUX STORE
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

// SET DEFAULT AXIOS
defaults.setAxios();


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Main />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
