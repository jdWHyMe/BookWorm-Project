import './css/App.css'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import { BookProvider } from './contexts/BookContext'
import { Routes, Route } from 'react-router-dom'
import NavBar from './Components/NavBar'

function App() {
  return (
    <>

      <BookProvider>
        <NavBar />
        <main className='main-content'>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/favorites" element={<Favorites />}/>
          </Routes>
        </main>
      </BookProvider>
    </>
  )
}

export default App
