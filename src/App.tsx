import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './Pages/Home'
import Authentication from './Pages/Authentication'

const App: React.FC = () => {

  const navigate = useNavigate()

  useEffect(() => {
    const auth = localStorage.getItem('crudauth')
    if (auth == null) {
      return navigate('/authentication')
    }
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/authentication' element={<Authentication />} />
    </Routes>
  )
}

export default App
