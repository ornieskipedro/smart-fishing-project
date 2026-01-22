import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

export default function CitySelector({ currentCity, onCityChange }) {
    const [input, setInput] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onCityChange(input);
            setInput("");
        }
    };

    return (
        <div className="flex flex-col w-full mb-6">
            <form onSubmit={handleSubmit} className="relative flex items-center w-full">

                {/* Search Input Container */}
                <div className={`flex-1 flex items-center bg-ocean-800 rounded-lg border transition-all duration-300 ${isFocused ? 'border-primary/50 ring-1 ring-primary/20' : 'border-transparent'} mr-3`}>
                    <Search className="w-5 h-5 text-gray-500 ml-4" />
                    <input
                        type="text"
                        placeholder="Buscar cidade..."
                        className="w-full bg-transparent text-text-main pl-3 pr-4 py-3 focus:outline-none placeholder:text-gray-600 font-medium"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                </div>

                <button
                    type="submit"
                    className="px-6 py-3 bg-ocean-700 hover:bg-ocean-600 active:bg-ocean-800 text-primary font-medium rounded-lg border border-white/5 transition-all duration-200 mr-4 shadow-lg hover:shadow-primary/5 cursor-pointer"
                >
                    Buscar
                </button>

                {/* Location Indicator (Right side, same line) */}
                <div className="flex items-center gap-2 text-gray-400 font-medium whitespace-nowrap">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-text-main">{currentCity}</span>
                </div>

            </form>
        </div>
    );
}
