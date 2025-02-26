import React, { useEffect, useState, useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import './App.scss'
import 'react-toastify/dist/ReactToastify.css'
import Sidebar from './component/sidebar/Sidebar'
import Login from './pages/login/Login'
import News from './pages/news/News'
import Plans from './pages/plans/Plans'
import Topbar from './component/topbar/Topbar'
import NotFound from './pages/notFound/NotFound'
import Notif from './pages/notif/Notif'
import UserController from './pages/userController/UserController'
import Tickets from './pages/tickets/Tickets'
import With from './pages/with/With'

import { EmailContext } from './context/emailContext/EmailContext';

function App() {
  const [menu, setMenu] = useState(false)
  const [current, setCurrent] = useState(
    window.location.pathname === '/' ? '/plans' : window.location.pathname,
  )
  const [title, setTitle] = useState('')
  const [first, setFirst] = useState(
    window.location.pathname === '/' ? '/plans' : window.location.pathname,
  )

  const { user } = useContext(EmailContext)
  // const user = false;

  // window.$url = 'https://api.fxtraderbot.ir';
  window.$url = 'http://localhost:3030'

  useEffect(() => {
    if (first === '/plans') setTitle('Plans')
    else if (first === '/news') setTitle('News')
    else if (first === '/login') setTitle('Login')
    else if (first === '/notif') setTitle('Notification')
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Sidebar
          menu={menu}
          setMenu={setMenu}
          setTitle={setTitle}
          current={current}
          setCurrent={setCurrent}
        />

        <div className={'mainSide'}>
          <Topbar menu={menu} setMenu={setMenu} title={title} />

          <Routes>
            <Route
              path="/"
              element={<Navigate to={user ? '/userController' : '/login'} />}
            />

            {!user && <Route path="/login" element={<Login />} />}

            {/* <Route path="/home" element={
            <>
              <Home />
            </>
          } />
          <Route path="/login" element={
            <Login />
          } />
          <Route path="/register" element={
            <Register />
          } /> */}

            <Route path="*" element={<NotFound />} />
            {user && (
              <>
                <Route
                  path="/userController"
                  element={
                    <UserController
                      setTitle={setTitle}
                      setCurrent={setCurrent}
                    />
                  }
                />
                <Route
                  path="/plans"
                  element={
                    <Plans setTitle={setTitle} setCurrent={setCurrent} />
                  }
                />
                <Route
                  path="/news"
                  element={<News setTitle={setTitle} setCurrent={setCurrent} />}
                />
                <Route
                  path="/notif"
                  element={
                    <Notif setTitle={setTitle} setCurrent={setCurrent} />
                  }
                />
                <Route
                  path="/tickets"
                  element={
                    <Tickets setTitle={setTitle} setCurrent={setCurrent} />
                  }
                />
                <Route
                  path="/withs"
                  element={<With setTitle={setTitle} setCurrent={setCurrent} />}
                />
              </>
            )}
          </Routes>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />
    </BrowserRouter>
  )
}

export default App
