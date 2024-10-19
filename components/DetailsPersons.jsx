import { useState, useEffect } from 'react';
import axiosInstance from '../src/axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';

export default function PersonDetail() {
    const { id } = useParams();
    const [person, setPerson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPerson = async () => {
            try {
                const response = await axiosInstance.get(`/person/${id}`);
                setPerson(response.data);
            } catch (err) {
                setError('Error fetching person details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPerson();
    }, [id]);

    if (loading) return <div className="text-center">Cargando...</div>;
    if (error) return <div className="text-center">{error}</div>;

    return (
        <div className="w-full bg-gray-100">
            {person && (
                <div className="max-w-4xl mx-auto p-4 rounded-lg shadow-lg bg-white">
                    <div className="relative">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                            alt={person.name}
                            className="w-full h-[40vh] object-cover rounded-t-lg"
                        />
                        <div className="absolute inset-0 bg-black opacity-30 rounded-t-lg"></div>
                    </div>
                    <div className="p-6 relative z-10">
                        <h1 className="text-3xl font-bold mb-2">{person.name}</h1>
                        <p className="text-gray-700 mb-4">Conocido por: {person.known_for_department}</p>
                        <p className="text-gray-700 mb-4">Biografía: {person.biography || 'No disponible'}</p>
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
