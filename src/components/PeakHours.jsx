import React from 'react';
import { Sun, Moon, Info } from 'lucide-react';

export default function PeakHours() {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-600">
                    <Sun className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Horários de Pico</h3>
            </div>

            <div className="space-y-4 flex-1">

                {/* Morning Card */}
                <div className="relative p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100/50 hover:border-amber-200 transition-colors group">
                    <div className="flex items-start justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">Manhã</span>
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                            <Sun className="w-4 h-4 text-white" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-800 mb-1">04:44 - 06:44</div>
                    <p className="text-xs text-gray-500">Período ideal para peixes de superfície</p>
                </div>

                {/* Evening Card */}
                <div className="relative p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100/50 hover:border-indigo-200 transition-colors group">
                    <div className="flex items-start justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">Tarde/Noite</span>
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                            <Moon className="w-4 h-4 text-white" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-800 mb-1">18:10 - 20:10</div>
                    <p className="text-xs text-gray-500">Melhor momento para espécies noturnas</p>
                </div>

            </div>

            {/* Tip Box */}
            <div className="mt-6 bg-cyan-50 border border-cyan-100 rounded-xl p-4 flex gap-3">
                <div className="shrink-0 pt-0.5">
                    <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center">
                        <Info className="w-3 h-3 text-white" />
                    </div>
                </div>
                <div>
                    <h4 className="text-sm font-bold text-cyan-900 mb-0.5">Dica de Pesca</h4>
                    <p className="text-xs text-cyan-700 leading-relaxed">
                        Os peixes são mais ativos durante as transições de luz (amanhecer e entardecer). Aproveite!
                    </p>
                </div>
            </div>

        </div>
    );
}
