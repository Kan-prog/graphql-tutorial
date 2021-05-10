// import React from 'react';
// import ReactDOM from 'react-dom';
// import './styles/index.css';
// import App from './components/App';
// import reportWebVitals from './reportWebVitals';
// // Appoloの依存関係をimport
// import {
//   ApolloProvider,
//   ApolloClient,
//   createHttpLink,
//   InMemoryCache
// } from '@apollo/client';
// import * as serviceWorker from './serviceWorker';


// // GraphQLのhttpリンクを設定
// const httpLink = createHttpLink({
//   uri: 'http://localhost:4000'
// });

// // クライアントとhttplinkを紐づけ
// const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache()
// });

// // ReactDOM.render(
// //   <React.StrictMode>
// //     <App />
// //   </React.StrictMode>,
// //   document.getElementById('root')
// // );

// ReactDOM.render(
//   <ApolloProvider client={client}>
//     <App />
//   </ApolloProvider>,
//   document.getElementById('root')
// );
// serviceWorker.unregister();

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


import React from 'react';
import ReactDOM from 'react-dom';
// import './styles/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { AUTH_TOKEN } from './constants';

import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
// ApolloClientがサーバーにリクエストを送るたびにこのミドルウェアが呼び出される。
// Apollo Linksを使用すると、サーバーに送信する前に変更要求を作成できる
import { setContext } from '@apollo/client/link/context';

// cors対策設定
const express = require('express')
const cors = require('cors')
const app = express()
var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};
app.use(cors(corsOptions));

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
});

const authLink = setContext((_, { headers }) => {
  // localStorageから、AUTH_TOKENを取得する
  const token = localStorage.getItem(AUTH_TOKEN);
  // 以下の形でauthLink変数にヘッダー情報が格納される。・
  // headers{
    // foo: foo,
    // bar: bar,
    // authorization: 取得したtoken
  // }
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  // 正しいリンクでインスタンス化する必要がある。concatで結合
  link: authLink.concat(httpLink),
  // link: httpLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
serviceWorker.unregister();