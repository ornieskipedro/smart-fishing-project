import React from 'react';
import { Wind, Thermometer, Gauge, Cloud } from 'lucide-react';

export default function WeatherGrid({ data }) {
    if (!data) return null;

    const { temp, pressure, windSpeed, description } = data;

    const cards = [
        { label: "Temperatura", value: `${temp}°C`, icon: Thermometer },
        { label: "Vento", value: `${windSpeed} km/h`, icon: Wind },
        { label: "Pressão", value: `${pressure} hPa`, icon: Gauge },
        { label: "Condição", value: description, icon: Cloud },
    ];

    return (
        <div className="grid grid-cols-2 gap-4 h-full">
            {cards.map((item, idx) => (
                <div key={idx} className="glass-panel p-4 md:p-5 flex flex-col items-start justify-center hover:bg-white/5 transition-colors group">
                    <div className="mb-3 p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                        <item.icon className="w-5 h-5 text-primary opacity-80" />
                    </div>
                    <span className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">{item.label}</span>
                    <span className="text-xl font-semibold text-text-main capitalize">{item.value}</span>
                </div>
            ))}
        </div>
    );
}
