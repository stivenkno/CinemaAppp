import { useState, useEffect } from 'react';
import axiosInstance from '../Instances/axiosInstance';
import { useNavigate } from 'react-router-dom';

export default function PopularMovies() {
    const [popularMovies, setPopularMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const response = await axiosInstance.get(`/movie/popular?language=en-US&page=${page}`);
                setPopularMovies(response.data.results);
                setTotalPages(response.data.total_pages); // Guarda el número total de páginas
                setLoading(false); // Cambia el estado de carga
            } catch (error) {
                setError('Error fetching popular movies');
                setLoading(false); // Cambia el estado de carga en caso de error
                console.error('Error fetching popular movies:', error);
            }
        };

        fetchPopularMovies();
    }, [page]); // Dependencia de page para cargar nuevas películas al cambiar la página

    const handleClick = (id) => {
        navigate(`/movie/${id}`);
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(prevPage => prevPage + 1); // Incrementa la página
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1); // Decrementa la página
        }
    };

    if (loading) return <div className="text-center">Cargando...</div>;
    if (error) return <div className="text-center">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Popular Movies</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                {popularMovies.map((movie) => (
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

            
            <div className="flex justify-between items-center mt-4">
                <button 
                    onClick={handlePrevPage} 
                    disabled={page === 1} 
                    className={`py-2 px-4 bg-blue-600 text-white rounded ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Anterior
                </button>
                <span>Página {page} de {totalPages}</span>
                <button 
                    onClick={handleNextPage} 
                    disabled={page === totalPages} 
                    className={`py-2 px-4 bg-blue-600 text-white rounded ${page === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}
