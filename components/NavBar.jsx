import { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../Instances/axiosInstance";
import { useNavigate } from "react-router-dom";

const NavBar = ({ setMovies }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const response = await axiosInstance.get(`/search/movie?query=${search}&language=en-US&page=1`);
      setMovies(response.data.results);
      console.log(response.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search`);
      fetchMovies();
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        
        {/* Logo */}
        <div className="text-white text-2xl font-bold">CinemaApp</div>

        {/* Enlaces de navegación */}
        <div className="flex flex-wrap justify-center sm:justify-end space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          <Link to="/personas" className="text-white hover:text-gray-300">People</Link>
          <Link to="/tvShows" className="text-white hover:text-gray-300">TvShows</Link>
        </div>

        {/* Barra de búsqueda */}
        <form className="flex w-full sm:w-auto items-center space-x-2" onSubmit={handleSubmit}>
          <input
            type="text"
            name="query"
            id="query"
            value={search}
            className="w-full sm:w-64 px-4 py-2 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search movies..."
            onChange={handleSearch}
          />
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 focus:outline-none"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default NavBar;
