import React, { useState } from 'react';
import { Search, Fish } from 'lucide-react';

export default function Header({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            onSearch(searchTerm);
        }
    };

    return (
        <header className="w-full bg-white border-b border-blue-100 py-4 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm z-50 relative">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-md">
                    <Fish className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">Tá Bom Pra Pescar?</h1>

                </div>
            </div>

            <form onSubmit={handleSearch} className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative w-full md:w-80 group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400 group-focus-within:text-cyan-500 transition-colors" />
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar cidade..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition-all duration-300 shadow-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 active:scale-95"
                >
                    Buscar
                </button>
            </form>
        </header>
    );
}
