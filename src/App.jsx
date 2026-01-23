import { useState } from 'react';
import { useWeather } from './hooks/useWeather';
import { calculateFishingScore } from './utils/fishingLogic';

import Header from './components/Header';
import ScoreCard from './components/ScoreCard';
import WeatherGrid from './components/WeatherGrid';
import BarometricChart from './components/BarometricChart';
import PeakHours from './components/PeakHours';

function App() {
  const [city, setCity] = useState("Piraquara");
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const { data, loading, error, refetch } = useWeather(city, apiKey);

  // Calculate score derived from data
  // Only calculate if data exists
  const fishingScore = data ? calculateFishingScore(data) : 0;

  return (
    <div className="min-h-screen pb-12 font-sans text-gray-800 selection:bg-cyan-100 selection:text-cyan-900">

      {/* Level 1: Header */}
      <Header onSearch={setCity} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8 animate-in fade-in duration-700 slide-in-from-bottom-4">

        {/* Helper Line (Location Badge) */}
        {!loading && !error && data && (
          <div className="flex justify-center -mb-4 relative z-10">
            <div className="bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-gray-100 shadow-sm flex items-center gap-2 text-sm font-medium text-gray-600 animate-pulse-slow">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>{data.city}</span>
            </div>
          </div>
        )}

        {error && (
          <div className="max-w-lg mx-auto bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-center">
            {error}
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-10 h-10 border-4 border-cyan-200 border-t-cyan-500 rounded-full animate-spin"></div>
            <p className="text-cyan-800 font-medium">Analisando condições...</p>
          </div>
        )}

        {!loading && !error && data && (
          <>
            {/* Level 2: Score Card */}
            <section>
              <ScoreCard score={fishingScore} weatherData={data} onRefresh={refetch} />
            </section>

            {/* Level 3: Metrics Grid */}
            <section>
              <WeatherGrid data={data} />
            </section>

            {/* Level 4 & 5: Charts & Details */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <BarometricChart />
              </div>
              <div>
                <PeakHours />
              </div>
            </section>
          </>
        )}
      </main>


      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 pt-6 border-t border-blue-100 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 uppercase tracking-widest gap-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-600">@ornieskipedro</span>
          <span className="w-1 h-1 rounded-full bg-cyan-300"></span>
          <span>dados reais pela OpenWeather</span>
        </div>
      </footer>
    </div >
  );
}

export default App;
