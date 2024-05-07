import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Link, RouterProvider, } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import PageHome from './pages/PageHome';
import PagePost from './pages/PagePost';
import PageAllPosts from './pages/PageAllPosts';
import LayoutDefault from './layout/LayoutDefault';

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageHome />,
    errorElement: <LayoutDefault>
      <div className="container">
        <div className="row">
          <main className="col">

            <h3> Página não encontrada</h3>
            <Link to="/">Volte para tela inicial</Link>
          </main>
        </div>
      </div>
    </LayoutDefault>,
  },
  {
    path: "/post/:slug",
    element: <PagePost />
  },
  {
    path: "/posts",
    element: <PageAllPosts />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
