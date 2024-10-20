import { useState, useEffect } from 'react';
import axiosInstance from '../Instances/axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';

export default function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axiosInstance.get(`/movie/${id}?language=en-US`);
                setMovie(response.data);
            } catch (err) {
                setError('Error fetching movie details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        const fecthSimilar = async () => {
            try {
                const response = await axiosInstance.get(`/movie/${id}/similar?language=en-US&page=1`);
                setSimilarMovies(response.data.results);
            } catch (err) {
                setError('Error fetching similar movies');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        
        fecthSimilar();
        fetchMovie();
    }, [id]);

    const handleClick = (id) => {
        navigate(`/movie/${id}`);
    };

    if (loading) return <div className="text-center">Cargando...</div>;
    if (error) return <div className="text-center">{error}</div>;

    return (
        <div className="w-full bg-gray-100">
            {movie && (
                <div className="max-w-4xl mx-auto p-4 rounded-lg shadow-lg bg-white">
                    <div className="relative">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                            alt={movie.title}
                            className="w-full h-[40vh] object-cover rounded-t-lg"
                        />
                        <div className="absolute inset-0 bg-black opacity-30 rounded-t-lg"></div>
                    </div>
                    <div className="p-6 relative z-10">
                        <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
                        <p className="text-gray-700 mb-4">{movie.overview}</p>
                        <p className="text-gray-500 mb-2">Fecha de lanzamiento: {movie.release_date}</p>
                        <p className="text-gray-500 mb-4">Puntuación: {movie.vote_average}</p>
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition duration-300"
                        >
                            Volver
                        </button>
                    </div>
                </div>
            )}
        
        <h2 className="text-2xl font-bold mb-4 px-20 py-4">Películas similares</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-20">
                {similarMovies.map((movie) => (
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
        </div>
        
    );
}
