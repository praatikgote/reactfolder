import './index.css';


//below is code for react router dome 

import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import AddPost from './components/AddPost';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Home />
    ),
  },
  {
    path: "about",
    element: <div>About</div>,
  },

  {
    path: "/login",
    element: (<Login />),
  },

  {
    path: "/signup",
    element: (<Signup />),
  },

  {
    path: "/add-post",
    element: (<AddPost />),
  },


  
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);



