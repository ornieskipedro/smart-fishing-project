import React from 'react';
import { Wind, Thermometer, Gauge, Cloud, Droplets, Sun, CloudRain } from 'lucide-react';
import { idealConditions } from '../utils/fishingLogic';

export default function WeatherGrid({ data }) {
    if (!data) return null;

    const { temp, pressure, windSpeed, description, humidity } = data;

    // Helper to calculate progress bar width (clamped 0-100)
    const getProgress = (val, max) => Math.min(100, Math.max(0, (val / max) * 100));

    // Dynamic Icon Logic (Simple mapping for now)
    const getConditionIcon = (desc) => {
        const lower = desc.toLowerCase();
        if (lower.includes('chuva')) return CloudRain;
        if (lower.includes('sol') || lower.includes('limpo')) return Sun;
        return Cloud;
    };
    const ConditionIcon = getConditionIcon(description);

    const cards = [
        {
            label: "Temperatura",
            value: `${Math.round(temp)}°C`,
            icon: Thermometer,
            color: "orange",
            progress: getProgress(temp, 40),
            gradient: "from-orange-400 to-orange-500",
            bg: "bg-orange-100",
            text: "text-orange-600"
        },
        {
            label: "Vento",
            value: `${windSpeed} km/h`,
            icon: Wind,
            color: "cyan",
            progress: getProgress(windSpeed, 50),
            gradient: "from-cyan-400 to-cyan-500",
            bg: "bg-cyan-100",
            text: "text-cyan-600"
        },
        {
            label: "Pressão",
            value: `${pressure} hPa`,
            icon: Gauge,
            color: "blue",
            progress: getProgress(pressure - 950, 100), // Normalize 950-1050
            gradient: "from-blue-400 to-blue-500",
            bg: "bg-blue-100",
            text: "text-blue-600"
        },
        {
            label: "Umidade", // Replaced Condition text card with Humidity for consistent metric style, or keep Condition? Prompt asked for "Condição" card.
            value: `${humidity}%`, // Let's use Humidity as the value for the progress bar, but label it "Umidade" or mix?
            // Prompt said: "Condição: gray-100... ícone dinâmico". Let's stick to prompt carefully.
            // But prompt listed 4 cards: Temp, Wind, Pressure, Condition.
            // Condition value is text. Progress bar for condition doesn't make sense, maybe use Humidity there?
            // Let's implement specific Condition card without progress bar, or use Humidity as proxy.
            displayValue: description,
            originalValue: humidity,
            isText: true,
            icon: ConditionIcon,
            color: "gray",
            progress: humidity, // Use humidity for the visual bar even if text is condition
            gradient: "from-gray-500 to-gray-600",
            bg: "bg-gray-100",
            text: "text-gray-600"
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.bg}`}>
                            <item.icon className={`w-6 h-6 ${item.text}`} />
                        </div>
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{item.label}</span>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-3xl font-bold text-gray-800 capitalize">
                            {item.isText && item.displayValue ? item.displayValue : item.value}
                        </h3>

                        {/* Progress Bar */}
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full bg-gradient-to-r ${item.gradient}`}
                                style={{ width: `${item.progress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
