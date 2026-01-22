import { useState, useEffect } from 'react';
import { useWeather } from './hooks/useWeather';
import ReferenceCard from './components/ReferenceCard';
import WeatherGrid from './components/WeatherGrid';
import PressureChart from './components/PressureChart';
import CitySelector from './components/CitySelector';
import ApiKeyInput from './components/ApiKeyInput';
import { Anchor } from 'lucide-react';

function App() {
  const [city, setCity] = useState("Florianópolis");
  const [apiKey, setApiKey] = useState(() => import.meta.env.VITE_WEATHER_API_KEY || localStorage.getItem("fishing_api_key") || "");

  const { data, loading, error, refetch } = useWeather(city, apiKey);

  // Persist API Key
  useEffect(() => {
    if (apiKey) localStorage.setItem("fishing_api_key", apiKey);
  }, [apiKey]);

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center">
      {/* Header */}
      <header className="mb-8 text-center animate-in fade-in slide-in-from-top duration-700">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-ocean-800 border border-ocean-700 mb-4 shadow-lg shadow-primary/10">
          <Anchor className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
          Pesca Inteligente
        </h1>
        <p className="text-slate-400 mt-2">Dashboard de previsão para pescadores</p>
      </header>

      {/* Inputs */}
      <CitySelector
        currentCity={data?.city || city}
        onCityChange={setCity}
        onRefresh={refetch}
      />

      {/* Main Content */}
      <main className="w-full max-w-5xl space-y-6">

        {loading && (
          <div className="text-center py-20 text-primary animate-pulse">
            Carregando dados do oceano...
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-xl text-center backdrop-blur">
            Erro: {error}
          </div>
        )}

        {!loading && !error && data && (
          <>
            {/* Top: Recommendation Card */}
            <section className="animate-in zoom-in duration-500">
              <ReferenceCard data={data} />
            </section>

            {/* Bottom: Grid & Chart */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom duration-700 delay-150">
              <div className="h-full">
                <WeatherGrid data={data} />
              </div>
              <div className="h-[300px] md:h-auto">
                <PressureChart currentPressure={data.pressure} />
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer / Settings */}
      <footer className="mt-12 text-slate-600 text-sm">
        <ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} />
      </footer>
    </div>
  );
}

export default App;
