
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        
        <div className="text-white text-2xl font-bold">
          CinemaApp
        </div>

        
        <div className="flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="/personas" className="text-white hover:text-gray-300">
            People
          </Link>
          <Link to="/tvShows" className="text-white hover:text-gray-300">
            TvShows
          </Link>
        </div>

        
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="px-4 py-2 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search movies..."
          />
          <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 focus:outline-none">
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
