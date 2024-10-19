
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Navbar from '../components/NavBar.jsx'
import PopularMovies from '../components/PopularMovies.jsx'
import Personas from '../components/personas.jsx'
import TvShows from '../components/tvShows.jsx'
import DetailsMovies from '../components/DetailsMovies.jsx'
import DetailsPersons from '../components/DetailsPersons.jsx'
import DetailsTvShows from '../components/DetailsTvShows.jsx'

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<PopularMovies />} />
        <Route path="/personas" element={ <Personas />} />
        <Route path="/tvShows" element={ <TvShows />} />
        <Route path="/movie/:id" element={ <DetailsMovies />} />
        <Route path="/person/:id" element={ <DetailsPersons />} />
        <Route path="/tv/:id" element={ <DetailsTvShows />} />
      </Routes>
    </Router>
  )
}

export default App
