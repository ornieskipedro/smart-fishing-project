import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

export default function CitySelector({ currentCity, onCityChange, onRefresh }) {
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onCityChange(input);
            setInput("");
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 w-full max-w-2xl mx-auto">
            {/* Current Location Display */}
            <div className="flex items-center gap-2 text-primary font-mono text-lg bg-ocean-800 px-4 py-2 rounded-lg border border-ocean-700">
                <MapPin className="w-5 h-5" />
                <span>{currentCity}</span>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSubmit} className="flex-1 w-full relative group">
                <input
                    type="text"
                    placeholder="Buscar cidade..."
                    className="w-full bg-ocean-800 text-white pl-10 pr-4 py-3 rounded-xl border border-ocean-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner placeholder:text-slate-500"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
            </form>

            <button
                onClick={onRefresh}
                className="px-6 py-3 bg-ocean-700 hover:bg-ocean-600 text-white font-semibold rounded-xl border border-ocean-600 transition-all hover:scale-105 active:scale-95"
            >
                Refresh
            </button>
        </div>
    );
}
