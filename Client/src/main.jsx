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
import Geo from "./Components/Geo/Geo.jsx"

import { Auth0Provider } from '@auth0/auth0-react';


createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <MyProvider>
      <BrowserRouter>

        {/* <Auth0Provider

          domain="dev-5r3jciba5tyzq5ze.us.auth0.com"
          clientId="tcL9WL6wAV4iHd4bIMXdJ7fMvUPvNVaS"
          clientSecret='mipFu6b2kNwgVIsT4T2NCyd4XC-1qtfBoIkZ-O6V1tRk0O4gjxrHh8_pQsaYU_8e'
          authorizationParams={{
            redirect_uri: 
            'http://localhost:5173/blog'
            //  window.location.origin
          }}
        > */}
          {/* <App /> */}
          <Routes>

            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/geo" element={<Geo />} />

            <Route element={<ProtectedRoutes />}  >

              <Route element={<Layout />} >

                <Route path="/blog" element={<Blog />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/user/:id" element={<ViewProfile />} />
                <Route path="/search" element={<Search />} />

              </Route>

            </Route>

          </Routes>
        {/* </Auth0Provider> */}

      </BrowserRouter>

    </MyProvider>
    {/* <App /> */}

  </React.StrictMode>,
)
