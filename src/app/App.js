import React from 'react';
import Root from './Root';
import Login from './Login';
import Friends from './Friends';
import Chat from './Chat';
import Profile from './Profile';
import io from 'socket.io-client';

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from 'react-router-dom'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Login />}/>
      <Route path="friends" element={<Friends />}/>
      <Route path="chat/:user" element={<Chat />}/>
      <Route path="profile" element={<Profile />}/>
    </Route>
  )
);

function App() {
  return (<RouterProvider router={router} />);
}

const socket = io("http://localhost:3000");

//socket.emit('send-message', message)

socket.on('receive-message', message => {
  displayMessage(message)
})

export default App;