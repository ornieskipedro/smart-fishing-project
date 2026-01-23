import React from 'react';
import { getConditionMessage } from '../utils/fishingLogic';
import { Wind, Gauge, TrendingUp } from 'lucide-react';

export default function ScoreCard({ score, weatherData, onRefresh }) {
    const { title, message, gradient } = getConditionMessage(score);

    return (
        <div className={`relative overflow-hidden w-full rounded-3xl p-8 bg-gradient-to-br ${gradient} shadow-lg transition-all duration-500`}>
            {/* Decorative Circles */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-black opacity-5 rounded-full blur-2xl"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-white">

                {/* Score Circle */}
                <div className="relative">
                    <div className="w-32 h-32 rounded-full border-4 border-white/30 flex flex-col items-center justify-center bg-white/20 backdrop-blur-md shadow-inner">
                        <span className="text-6xl font-bold">{score}</span>
                        <span className="text-xs font-semibold uppercase tracking-widest opacity-80">Score</span>
                    </div>
                    {/* Badge */}
                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 p-2 rounded-full shadow-lg">
                        <TrendingUp className="w-5 h-5" />
                    </div>
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left space-y-2">
                    <h2 className="text-3xl font-bold">{title}</h2>
                    <p className="text-lg text-white/90 font-medium leading-relaxed">{message}</p>

                    {/* Quick Stats Inline */}
                    <div className="flex items-center justify-center md:justify-start gap-4 mt-4 text-sm font-medium opacity-80">
                        <div className="flex items-center gap-1">
                            <Gauge className="w-4 h-4" />
                            <span>{weatherData.pressure} hPa</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-white/50"></div>
                        <div className="flex items-center gap-1">
                            <Wind className="w-4 h-4" />
                            <span>{weatherData.windSpeed} km/h</span>
                        </div>
                    </div>
                </div>

                {/* Action */}
                <div>
                    <button
                        onClick={onRefresh}
                        className="group relative px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                    >
                        <TrendingUp className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        <span>Atualizar</span>
                    </button>
                </div>

            </div>
        </div>
    );
}
