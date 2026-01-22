import React, { useState } from 'react';
import { Key } from 'lucide-react';

export default function ApiKeyInput({ apiKey, setApiKey }) {
    const [showInput, setShowInput] = useState(!apiKey);
    const [val, setVal] = useState(apiKey || '');

    const handleSave = () => {
        setApiKey(val);
        setShowInput(false);
    };

    // If key exists (from env or local), show a very subtle indicator or edit button
    if (!showInput) {
        return (
            <button
                onClick={() => setShowInput(true)}
                className="opacity-20 hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-white/10"
                title="Configurar API Key"
            >
                <Key className="w-4 h-4 text-white" />
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="glass-panel p-6 max-w-sm w-full bg-ocean-800 border-ocean-600 shadow-2xl">
                <h3 className="text-lg font-medium mb-1 text-white">Configuração</h3>
                <p className="text-xs text-gray-400 mb-4">
                    Insira sua chave OpenWeatherMap. Mantenha vazio para Modo Simulado.
                </p>

                <input
                    type="text"
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                    placeholder="API Key..."
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white text-sm mb-4 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all"
                />

                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => setShowInput(false)}
                        className="text-xs text-gray-400 hover:text-white px-3 py-2 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-primary hover:bg-primary/90 text-ocean-900 font-semibold rounded-lg text-xs transition-colors shadow-lg shadow-primary/20"
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}
