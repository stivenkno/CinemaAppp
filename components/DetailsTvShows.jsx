import { useState, useEffect } from 'react';
import axiosInstance from '../Instances/axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';

export default function TVShowDetail() {
    const { id } = useParams();
    const [tvShow, setTVShow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTVShow = async () => {
            try {
                const response = await axiosInstance.get(`/tv/${id}?language=en-US`);
                setTVShow(response.data);
            } catch (err) {
                setError('Error fetching TV show details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchTVShow();
    }, [id]);

    if (loading) return <div className="text-center">Cargando...</div>;
    if (error) return <div className="text-center">{error}</div>;

    return (
        <div className="w-full bg-gray-100">
            {tvShow && (
                <div className="max-w-4xl mx-auto p-4 rounded-lg shadow-lg bg-white">
                    <div className="relative">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${tvShow.backdrop_path}`}
                            alt={tvShow.name}
                            className="w-full h-[40vh] object-cover rounded-t-lg"
                        />
                        <div className="absolute inset-0 bg-black opacity-30 rounded-t-lg"></div>
                    </div>
                    <div className="p-6 relative z-10">
                        <h1 className="text-3xl font-bold mb-2">{tvShow.name}</h1>
                        <p className="text-gray-700 mb-4">Resumen: {tvShow.overview}</p>
                        <p className="text-gray-500 mb-2">Fecha de estreno: {tvShow.first_air_date}</p>
                        <p className="text-gray-500 mb-4">Puntuación: {tvShow.vote_average}</p>
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition duration-300"
                        >
                            Volver
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
