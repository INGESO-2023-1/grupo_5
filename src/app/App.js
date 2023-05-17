import React from 'react';
import Login from './Login';
import Friends from './Friends'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'



const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/friends",
    element: <Friends />
  },
]);


function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}


export default App;