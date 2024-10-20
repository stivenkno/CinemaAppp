import { useNavigate } from 'react-router-dom';

function SearchRenderr({ movies }) {
    const navigate = useNavigate(); 

    const handleClick = (id) => {
        navigate(`/movie/${id}`);
    };
    return (
        <main className="container mx-auto p-4">
           <h1 className="text-3xl font-bold mb-6 text-center">Resultados de busqueda</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                 {movies.map((movie) => (
                        <div onClick={() => { handleClick(movie.id) }} key={movie.id} className="bg-gray-800 text-white p-4 rounded-lg shadow-lg hover:cursor-pointer ">
                        <img
                         src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                         alt={movie.title}
                         className="rounded-lg mb-4"
                        />
                        <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
                        <p className="text-gray-400 text-sm mb-4">{movie.overview.substring(0, 100)}...</p>
                       </div>
              ))}
           </div>
        </main>
    );
}

function NotFound() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">No se encontraron resultados.</h1>
        </div>
    );
}

export default function SearchRender({ movies }) {

    const hasMovies = movies.length > 0;

    return (
        <div>
            {hasMovies ? <SearchRenderr movies={movies} /> : <NotFound />}
        </div>
    );
}