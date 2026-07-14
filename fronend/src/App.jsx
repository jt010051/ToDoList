import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { MainPage } from './components/MainPage'
import { Route, Routes } from 'react-router-dom'
import CurrentList from './components/CurrentList'

function App() {
  return (
    <>
    <Routes>
<Route index element={<MainPage />} />

<Route>
<Route path="/cList"element={<CurrentList />} />

            <Route path= "/" element={<MainPage />} />
          </Route>
</Routes>
    </>
  )
}

export default App
