// import { useState } from 'react'
import Login from './components/Login'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './components/ViewPage'

function App() {
 

  return (
   <>
   <Router>
      <Routes>
      <Route path="/" element={<Login />} />

        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} /> {/* Define route for Dashboard */}
      </Routes>
    </Router>
   </>
  )
}

export default App
