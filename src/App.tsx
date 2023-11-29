
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAppDispatch } from './store/storeHooks'
import { setCurrentUser, setToken } from './store/slices/authSlice'

import uuid from 'react-uuid';
import Home from './pages/Home/Home'
import Price from './pages/Price/Price'
import BottomMenu from './components/BotomMenu/BotomMenu'
import axios from 'axios';

function App() {
  const [active, setActive] = useState(1)
  const currentUser = localStorage.getItem('currentUser');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentUser === null) {
      dispatch(setCurrentUser(uuid()))
    } else {
      dispatch(setCurrentUser(currentUser))
    }
  }, [])

  useEffect(() => {
    const url = 'http://localhost:3000/me/'+currentUser;
    currentUser && axios.get(url)
      .then(response => {
        dispatch(setToken(response?.data.token));
      })
      .catch(error => {
        console.error('POST error:', error);
      });
  }, [currentUser])

  return (
    <div className="wrapper">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/price' element={<Price />} />
      </Routes>
      <BottomMenu active={active} setActive={setActive} />
    </div>
  )
}

export default App
