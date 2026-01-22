import React from 'react';
import { calculateFishingIndex } from '../utils/fishingLogic';
import { Fish, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { clsx } from 'clsx';

export default function ReferenceCard({ data }) {
    if (!data) return null;

    const { pressure, windSpeed } = data;
    const { score, message, color } = calculateFishingIndex(pressure, windSpeed);

    // Map color status to CSS classes
    const colorStyles = {
        green: "bg-emerald-500/20 border-emerald-500 text-emerald-300",
        yellow: "bg-amber-500/20 border-amber-500 text-amber-300",
        red: "bg-red-500/20 border-red-500 text-red-300",
    };

    const currentStyle = colorStyles[color] || colorStyles.red;

    return (
        <div className={clsx("w-full p-6 rounded-2xl border-2 transition-all duration-500 shadow-2xl backdrop-blur-sm", currentStyle)}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                {/* Score Circle */}
                <div className="flex items-center justify-center">
                    <div className={clsx("w-24 h-24 rounded-full border-4 flex items-center justify-center bg-black/20",
                        color === 'green' ? 'border-emerald-400' :
                            color === 'yellow' ? 'border-amber-400' : 'border-red-400'
                    )}>
                        <div className="text-center">
                            <span className="block text-3xl font-bold">{score}</span>
                            <span className="text-xs uppercase opacity-75">Score</span>
                        </div>
                    </div>
                </div>

                {/* Message Content */}
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-bold mb-1 flex items-center justify-center md:justify-start gap-2">
                        {color === 'green' && <Fish className="w-8 h-8" />}
                        {color === 'yellow' && <AlertTriangle className="w-8 h-8" />}
                        {color === 'red' && <XCircle className="w-8 h-8" />}
                        {color === 'green' ? "Excelente!" : color === 'yellow' ? "Atenção" : "Ruim"}
                    </h2>
                    <p className="text-lg font-medium opacity-90">{message}</p>
                </div>

                {/* Mini Stats Context */}
                <div className="text-sm opacity-80 grid grid-cols-2 gap-x-6 gap-y-1 text-right">
                    <span>Pressão:</span>
                    <span className="font-mono">{pressure} hPa</span>
                    <span>Vento:</span>
                    <span className="font-mono">{windSpeed} km/h</span>
                </div>
            </div>
        </div>
    );
}
