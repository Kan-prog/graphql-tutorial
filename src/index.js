import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
// Appoloの依存関係をimport
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import * as serviceWorker from './serviceWorker';


// GraphQLのhttpリンクを設定
const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
});

// クライアントとhttplinkを紐づけ
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
