import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Mock data generator for demo purposes
const getMockData = (city) => {
    const basePressure = 1010 + Math.random() * 20 - 10; // 1000-1020
    const baseTemp = 20 + Math.random() * 10; // 20-30
    const baseWind = Math.random() * 35; // 0-35 km/h

    return {
        temp: Math.round(baseTemp),
        pressure: Math.round(basePressure),
        windSpeed: Math.round(baseWind), // km/h
        description: "Céu Limpo (Simulação)",
        icon: "01d",
        city: city || "Simulação",
        timestamp: Date.now()
    };
};

export function useWeather(city, apiKey) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWeather = useCallback(async () => {
        if (!city) return;

        setLoading(true);
        setError(null);

        // If no API key is provided, use Mock Mode
        if (!apiKey) {
            console.log("No API Key provided, using Mock Data");
            setTimeout(() => {
                setData(getMockData(city));
                setLoading(false);
            }, 800);
            return;
        }

        try {
            const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    q: city,
                    appid: apiKey,
                    units: 'metric',
                    lang: 'pt_br'
                }
            });

            const d = response.data;

            setData({
                temp: Math.round(d.main.temp),
                pressure: d.main.pressure,
                // Convert m/s to km/h
                windSpeed: Math.round(d.wind.speed * 3.6),
                description: d.weather[0].description,
                icon: d.weather[0].icon,
                city: d.name,
                timestamp: Date.now()
            });
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            // Fallback to mock on error? Maybe not, better to show error to debug API key.
        } finally {
            setLoading(false);
        }
    }, [city, apiKey]);

    // Initial fetch
    useEffect(() => {
        fetchWeather();
    }, [fetchWeather]);

    return { data, loading, error, refetch: fetchWeather };
}
