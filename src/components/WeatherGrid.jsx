import React from 'react';
import { Wind, Thermometer, Gauge, Cloud } from 'lucide-react';

export default function WeatherGrid({ data }) {
    if (!data) return null;

    const { temp, pressure, windSpeed, description } = data;

    const cards = [
        { label: "Temperatura", value: `${temp}°C`, icon: Thermometer, color: "text-orange-400" },
        { label: "Vento", value: `${windSpeed} km/h`, icon: Wind, color: "text-sky-400" },
        { label: "Pressão", value: `${pressure} hPa`, icon: Gauge, color: "text-purple-400" },
        { label: "Condição", value: description, icon: Cloud, color: "text-slate-200" },
    ];

    return (
        <div className="grid grid-cols-2 gap-4">
            {cards.map((item, idx) => (
                <div key={idx} className="glass-panel p-4 flex flex-col items-center justify-center text-center hover:bg-ocean-700/50 transition-colors">
                    <item.icon className={`w-8 h-8 ${item.color} mb-2`} />
                    <span className="text-slate-400 text-sm">{item.label}</span>
                    <span className="text-xl font-bold mt-1 capitalize">{item.value}</span>
                </div>
            ))}
        </div>
    );
}
