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
            <form onSubmit={handleSubmit} className="relative flex flex-col md:flex-row items-center w-full gap-4 md:gap-0">

                {/* Search Input Container */}
                <div className={`w-full md:flex-1 flex items-center bg-ocean-800 rounded-lg border transition-all duration-300 ${isFocused ? 'border-primary/50 ring-1 ring-primary/20' : 'border-transparent'} md:mr-3`}>
                    <Search className="w-5 h-5 text-gray-500 ml-4 shrink-0" />
                    <input
                        type="text"
                        placeholder="Buscar cidade..."
                        className="w-full bg-transparent text-text-main pl-3 pr-4 py-3 focus:outline-none placeholder:text-gray-500 font-medium text-base"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                </div>

                <div className="flex items-center w-full md:w-auto justify-between md:justify-start gap-4">
                    <button
                        type="submit"
                        className="flex-1 md:flex-none px-6 py-3 bg-ocean-700 hover:bg-ocean-600 active:bg-ocean-800 text-primary font-medium rounded-lg border border-white/5 transition-all duration-200 md:mr-4 shadow-lg hover:shadow-primary/5 cursor-pointer text-base"
                    >
                        Buscar
                    </button>

                    {/* Location Indicator (Right side, same line) */}
                    <div className="flex md:hidden items-center gap-2 text-gray-400 font-medium whitespace-nowrap">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-text-main">{currentCity}</span>
                    </div>
                </div>

                {/* Desktop Location Indicator */}
                <div className="hidden md:flex items-center gap-2 text-gray-400 font-medium whitespace-nowrap">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-text-main">{currentCity}</span>
                </div>

            </form>
        </div>
    );
}
