import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./Components/Login/Login.jsx"
import Layout from "./Components/Layout/Layout.jsx"
import Blog from "./Components/Blog/Blog.jsx"
import Messages from "./Components/Messages/Messages.jsx"
import Profile from "./Components/Profile/Profile.jsx"
import Search from "./Components/Search/Search.jsx"
import ProtectedRoutes from './Components/ProtectedRoute/ProtectedRoute.jsx'
import ViewProfile from './Components/ViewProfile/ViewProfile.jsx'
import { MyProvider } from "./hooks/context-hook.jsx"

createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <MyProvider>
      <BrowserRouter>

        <Routes>

          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoutes />}  >

            <Route  element={<Layout />} >

              <Route path="/blog" element={<Blog />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/user/:id" element={<ViewProfile />} />
              <Route path="/search" element={<Search />} />

            </Route>

          </Route>

        </Routes>

      </BrowserRouter>

    </MyProvider>
    {/* <App /> */}

  </React.StrictMode>,
)
