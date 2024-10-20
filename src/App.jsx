import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { useState } from 'react'

import Navbar from '../components/NavBar.jsx'
import PopularMovies from '../components/PopularMovies.jsx'
import Personas from '../components/Personas.jsx'
import TvShows from '../components/tvShows.jsx'
import DetailsMovies from '../components/DetailsMovies.jsx'
import DetailsPersons from '../components/DetailsPersons.jsx'
import DetailsTvShows from '../components/DetailsTvShows.jsx'
import SearchRender from '../components/SearchRender.jsx'

function App() {

  const [movies, setMovies] = useState([]); // El estado se maneja en el componente padre

  const handleSetMovies = (newMovies) => {
    setMovies(newMovies); // Función para actualizar las películas desde NavBar
  };

  return (
    <Router>
      <Navbar setMovies={handleSetMovies} />
      <Routes>
        <Route path="/" element={<PopularMovies />} />
        <Route path="/personas" element={ <Personas />} />
        <Route path="/tvShows" element={ <TvShows />} />
        <Route path="/movie/:id" element={ <DetailsMovies />} />
        <Route path="/person/:id" element={ <DetailsPersons />} />
        <Route path="/tv/:id" element={ <DetailsTvShows />} />
        <Route path="/search" element={<SearchRender movies={movies} />} />
      </Routes>

      
    </Router>
  )
}

export default App
