import React from 'react'
import Navbar from './components/Navbar'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Create from './components/Create'
import Read from './components/Read'
import Update from './components/Update'
const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Create/>}/>
      <Route path='/all' element={<Read/>}/>
      <Route path='/update/:id' element={<Update/>}/>
    </Routes>
    </BrowserRouter>  
  )
}

export default App
