import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'
import {createBrowserRouter,Navigate,RouterProvider} from 'react-router-dom'
import RootLayout from './components/RootLayout.jsx'
import Home from './components/common/Home.jsx'
import UserProfile from './components/user/UserProfile.jsx'
import AuthorProfile from './components/author/AuthorProfile.jsx'
import Articles from './components/common/Articles.jsx'
import ArticleByID from './components/common/ArticleByID.jsx'
import PostArticle from './components/author/PostArticle.jsx'
import Login from './components/common/Login.jsx';
import Register from './components/common/Register.jsx';
import UserContext from './contexts/UserContext.jsx';
import ArticlesByAuthor from './components/common/ArticlesByAuthor.jsx';
import DeletedArticles from './components/common/DeletedArticles.jsx';
const browserRouterObj=createBrowserRouter([
  {
    path:'/',
    element:<RootLayout/>,
    children:[
      {
        path:'',
        element:<Home/>
      },{
        path:'signin',
        element:<Login/>
      },{
        path:'signup',
        element:<Register/>
      },{
        path:'user-profile/:email',
        element:<UserProfile/>,
        children:[
          {
            path:'articles',
            element:<Articles/>
          },{
           path:':articleId',
           element:<ArticleByID/>
           },{
            path:"",
            element:<Navigate to="articles"/>
           }
        ]
      },{
        path:'author-profile/:email',
        element:<AuthorProfile/>,
        children:[
          {
            path:'article',
            element:<PostArticle/>
          },{
            path:'articles',
            element:<Articles/>
          },{
           path:':articleId',
           element:<ArticleByID/>
           },{
            path:"",
            element:<Navigate to="articles"/>
           },{
            path:"author-articles",
            element:<ArticlesByAuthor/>
           },{
            path:'deleted-articles',
            element: <DeletedArticles/>
           }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContext>
      <RouterProvider router={browserRouterObj}/>
    </UserContext>
  </StrictMode>,
)
