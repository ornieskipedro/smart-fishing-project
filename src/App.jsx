import { useState, useEffect } from 'react';
import { useWeather } from './hooks/useWeather';
import ReferenceCard from './components/ReferenceCard';
import WeatherGrid from './components/WeatherGrid';
import PressureChart from './components/PressureChart';
import CitySelector from './components/CitySelector';
import ApiKeyInput from './components/ApiKeyInput';
import { Anchor } from 'lucide-react';

function App() {
  const [city, setCity] = useState("Piraquara");
  const [apiKey, setApiKey] = useState(() => import.meta.env.VITE_WEATHER_API_KEY || localStorage.getItem("fishing_api_key") || "");

  const { data, loading, error, refetch } = useWeather(city, apiKey);

  useEffect(() => {
    if (apiKey) localStorage.setItem("fishing_api_key", apiKey);
  }, [apiKey]);

  return (
    <div className="min-h-screen p-4 md:p-12 flex flex-col items-center justify-start md:justify-center font-sans tracking-tight">



      {/* Simplified Header */}
      <header className="mb-12 text-center flex flex-col items-center">
        <div className="flex items-center gap-3 text-primary mb-2">
          <Anchor className="w-5 h-5 opacity-80" />
          <h1 className="text-xl font-semibold text-text-main tracking-wide">
            Pesca Inteligente
          </h1>
        </div>
        <p className="text-sm text-gray-500 font-medium">Dashboard Meteorológico</p>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-4xl space-y-8 animate-in fade-in duration-700">

        {/* Search & Location Line */}
        <CitySelector
          currentCity={data?.city || city}
          onCityChange={setCity}
        />

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-200 p-4 rounded-xl text-center backdrop-blur text-sm">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="h-64 flex items-center justify-center text-primary/50 text-sm font-light animate-pulse">
            Carregando dados...
          </div>
        )}

        {/* Content */}
        {!loading && !error && data && (
          <div className="space-y-6">

            {/* Top: Status Card with embedded Refresh */}
            <ReferenceCard data={data} onRefresh={refetch} />

            {/* Bottom: Splits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-full min-h-[250px]">
                <WeatherGrid data={data} />
              </div>
              <div className="h-full">
                <PressureChart currentPressure={data.pressure} />
              </div>
            </div>

          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl mt-12 mb-6 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[10px] text-gray-600 uppercase tracking-widest gap-4">
        <div className="flex items-center gap-2">
          <span>@ornieskipedro</span>
          <span className="w-1 h-1 rounded-full bg-gray-700"></span>
          <span>dados reais pela OpenWeather</span>
        </div>

        <ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} />
      </footer>
    </div>
  );
}

export default App;
