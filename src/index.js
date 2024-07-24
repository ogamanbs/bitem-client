import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import App from './App/Home/App';
import Shop from './App/Shop/Shop';
import Admin from './App/Owners/Admin/Admin';
import NotFound from './App/NotFound';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/shop",
    element: <Shop />
  },
  {
    path:"/owners/admin",
    element: <Admin />
  },{
    path:"/:id",
    element:<NotFound />
  },{
    path:"/robots.txt",
    element:<NotFound />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
