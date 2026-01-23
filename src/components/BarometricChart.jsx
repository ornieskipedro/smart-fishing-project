import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function BarometricChart() {
    // Mock data as requested in prompt design
    const data = [1016, 1017, 1017.5, 1018, 1018.5, 1018, 1017.5, 1017];
    const timeLabels = ['15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

    // SVG Calculations
    const width = 800;
    const height = 200;
    const padding = 20;

    const minVal = Math.min(...data) - 1;
    const maxVal = Math.max(...data) + 1;

    const points = data.map((val, idx) => {
        const x = (idx / (data.length - 1)) * (width - padding * 2) + padding;
        const y = height - ((val - minVal) / (maxVal - minVal)) * (height - padding * 2) - padding;
        return `${x},${y}`;
    }).join(' ');

    // Area path (close the loop at bottom)
    const areaPath = `${points} ${width - padding},${height} ${padding},${height}`;

    return (
        <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-bold text-gray-800">Tendência Barométrica</h3>
                    <p className="text-sm text-gray-500">Últimas 8 horas</p>
                </div>
                <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-xl text-sm font-medium">
                    <TrendingUp className="w-4 h-4" />
                    <span>Estável</span>
                </div>
            </div>

            <div className="w-full aspect-[4/1]">
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
                    <defs>
                        <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05" />
                        </linearGradient>
                    </defs>

                    {/* Area */}
                    <path d={`M${points.split(' ')[0]} L${areaPath} Z`} fill="url(#gradientArea)" stroke="none" />

                    {/* Line */}
                    <path d={`M${points}`} fill="none" stroke="#06b6d4" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

                    {/* Points */}
                    {data.map((val, idx) => {
                        const x = (idx / (data.length - 1)) * (width - padding * 2) + padding;
                        const y = height - ((val - minVal) / (maxVal - minVal)) * (height - padding * 2) - padding;
                        return (
                            <circle key={idx} cx={x} cy={y} r="4" fill="white" stroke="#06b6d4" strokeWidth="2" />
                        );
                    })}
                </svg>
            </div>

            <div className="flex justify-between mt-4 px-2">
                {timeLabels.map((time, idx) => (
                    <span key={idx} className="text-xs text-gray-400 font-medium font-sans">{time}</span>
                ))}
            </div>
        </div>
    );
}
