import React from 'react';
import ReactDOM from 'react-dom/client'; // 'react-dom/client'에서 가져오기
import './index.css';
import App from './App';

// 렌더링할 루트를 생성
const root = ReactDOM.createRoot(document.getElementById('root'));

// App 컴포넌트를 렌더링
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
