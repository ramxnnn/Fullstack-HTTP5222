import './App.css'
import Header from "./components/Header"
//import Movie from "./components/Movie"
import Counter from "./components/Counter"
import MovieList from './components/MovieList'
import Footer from  "./components/Footer"

function App() {
  return (
    <>
      <Header />
      <main>
        <Counter />
        {/*<Movie title="Turning Red" year={2022} />*/}
        <MovieList />
      </main>
      <Footer />
    </>
  )
}

export default App
