// src/axiosInstance.js
import axios from 'axios';

// Aquí defines la URL base y la clave de API de TMDB
const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',  // Base URL de la API de TMDB
  params: {
    api_key: '68bfe63fdcdc4d0a16ccc5ab070915b6',  // Reemplaza con tu API Key de TMDB
    language: 'es-ES',  // Puedes ajustar el idioma de las respuestas
  }
});

export default axiosInstance;