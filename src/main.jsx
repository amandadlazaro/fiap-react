import React from 'react'
import ReactDOM from 'react-dom/client'
import {  createBrowserRouter,  RouterProvider,} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import PageHome from './pages/PageHome';
import PagePost from './pages/PagePost';

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageHome />,
    errorElement: <PageHome />,
  },
  {
    path: "/post/:slug",
    element: <PagePost />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
