import React from 'react';
import { calculateFishingIndex } from '../utils/fishingLogic';
import { Fish, AlertTriangle, CheckCircle, XCircle, RefreshCw } from 'lucide-react'; // Added RefreshCw
import { clsx } from 'clsx';

export default function ReferenceCard({ data, onRefresh }) {
    if (!data) return null;

    const { pressure, windSpeed } = data;
    const { score, message, color } = calculateFishingIndex(pressure, windSpeed);

    // Softened color palette for statuses
    const styles = {
        green: {
            border: "border-primary/20",
            bg: "to-primary/5", // Gradient accent
            text: "text-primary",
            icon: "text-primary"
        },
        yellow: {
            border: "border-accent-amber/20",
            bg: "to-accent-amber/5",
            text: "text-accent-amber",
            icon: "text-accent-amber"
        },
        red: {
            border: "border-red-400/20",
            bg: "to-red-500/5",
            text: "text-red-300",
            icon: "text-red-400"
        }
    };

    const s = styles[color] || styles.red;

    return (
        <div className={clsx(
            "relative overflow-hidden w-full p-6 md:p-8 rounded-2xl bg-gradient-to-br from-ocean-700 via-ocean-700",
            s.bg,
            "border border-white/5 shadow-xl backdrop-blur-xl transition-all duration-500"
        )}>

            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">

                {/* Score - Visual Softening */}
                <div className="relative group">
                    {/* Glow effect */}
                    <div className={clsx("absolute inset-0 rounded-full blur-xl opacity-20 transition-opacity group-hover:opacity-30", s.bg.replace("to-", "bg-"))}></div>

                    <div className={clsx(
                        "relative z-10 w-24 h-24 md:w-28 md:h-28 rounded-full flex flex-col items-center justify-center bg-ocean-800 border-4",
                        s.border
                    )}>
                        <span className={clsx("text-3xl md:text-4xl font-bold", s.text)}>{score}</span>
                        <span className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider">Score</span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left space-y-2">
                    <h2 className={clsx("text-xl font-medium flex items-center justify-center md:justify-start gap-3", s.text)}>
                        {color === 'green' && <Fish className="w-5 h-5" />}
                        {color === 'yellow' && <AlertTriangle className="w-5 h-5" />}
                        {color === 'red' && <XCircle className="w-5 h-5" />}
                        <span>
                            {color === 'green' ? "Condições Ideais" : color === 'yellow' ? "Atenção Necessária" : "Não Recomendado"}
                        </span>
                    </h2>
                    <p className="text-gray-300 font-light leading-relaxed max-w-lg text-sm md:text-base">
                        {message}
                    </p>
                </div>

            </div>

            {/* Footer / Refresh Trigger */}
            <div className="mt-6 md:mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 gap-4 md:gap-0">
                <div className="flex gap-6">
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
                        Pressão {pressure} hPa
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
                        Vento {windSpeed} km/h
                    </span>
                </div>

                <button
                    onClick={onRefresh}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-3 py-2 md:py-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-primary transition-colors cursor-pointer group bg-white/5 md:bg-transparent"
                >
                    <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                    <span>Atualizar</span>
                </button>
            </div>

        </div>
    );
}
