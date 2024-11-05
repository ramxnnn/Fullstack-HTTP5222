import './App.css'
import Header from "./components/Header"
import Footer from  "./components/Footer"
//page content components
import Home from "./pages/Home"
import About from "./pages/About"
import Question from "./components/Question"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
