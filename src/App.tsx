import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CountriesProvider } from './context/CountriesContext'
import { ThemeProvider } from './context/ThemeContext'
import { Header } from './components/Header'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CountriesProvider>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/country/:cca3" element={<DetailPage />} />
          </Routes>
        </CountriesProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
