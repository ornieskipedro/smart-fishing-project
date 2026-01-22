import React, { useState } from 'react';
import { Key } from 'lucide-react';

export default function ApiKeyInput({ apiKey, setApiKey }) {
    const [showInput, setShowInput] = useState(!apiKey);
    const [val, setVal] = useState(apiKey || '');

    const handleSave = () => {
        setApiKey(val);
        setShowInput(false);
    };

    if (!showInput) {
        return (
            <button
                onClick={() => setShowInput(true)}
                className="fixed bottom-4 right-4 text-xs text-slate-500 hover:text-primary flex items-center gap-1 opacity-50 hover:opacity-100 transition-opacity"
            >
                <Key className="w-3 h-3" /> Configurar API
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="glass-panel p-6 max-w-md w-full">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <Key className="w-5 h-5 text-primary" /> Configuração
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                    Insira sua chave da OpenWeatherMap. Se deixar vazio, o app usará o <strong>Modo de Simulação</strong>.
                </p>

                <input
                    type="text"
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                    placeholder="Ex: 8b3f..."
                    className="w-full bg-ocean-900 border border-ocean-600 rounded p-2 text-white mb-4 focus:border-primary focus:outline-none"
                />

                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => setShowInput(false)}
                        className="px-4 py-2 hover:bg-white/10 rounded text-sm transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-primary text-black font-bold rounded text-sm hover:bg-emerald-400 transition-colors"
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}
