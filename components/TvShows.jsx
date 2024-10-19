import { useState, useEffect } from "react";
import axiosInstance from "../src/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function TvShows() {
    const [tvShows, setTvShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTvShows = async () => {
            try {
                const response = await axiosInstance.get(`/tv/popular?language=en-US&page=${page}`);
                setTvShows(response.data.results);
                setTotalPages(response.data.total_pages); // Guarda el número total de páginas
                setLoading(false); // Cambia el estado de carga
            } catch (error) {
                setError('Error fetching TV shows');
                setLoading(false); // Cambia el estado de carga en caso de error
                console.error('Error fetching tvShows:', error);
            }
        };
        fetchTvShows();
    }, [page]); // Dependencia de page para cargar nuevos shows al cambiar la página

    const handleClick = (id) => {
        navigate(`/tv/${id}`);
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage((prevPage) => prevPage + 1); // Incrementa la página
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1); // Decrementa la página
        }
    };

    if (loading) return <div className="text-center">Cargando...</div>;
    if (error) return <div className="text-center">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Popular TV Shows</h1>

            {/* Grid container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                {tvShows.map((tvShow) => (
                    <div onClick={() => handleClick(tvShow.id)} key={tvShow.id} className="bg-gray-800 text-white p-4 rounded-lg shadow-lg hover:cursor-pointer">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                            alt={tvShow.name}
                            className="rounded-lg mb-4"
                        />
                        <h2 className="text-xl font-semibold mb-2">{tvShow.name}</h2>
                        <p className="text-gray-400 mb-4">{tvShow.overview.substring(0, 100)}...</p>
                    </div>
                ))}
            </div>

            {/* Controles de paginación */}
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
