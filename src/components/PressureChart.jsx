import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function PressureChart({ currentPressure }) {

    // Generate mock history ending at currentPressure
    const data = useMemo(() => {
        if (!currentPressure) return [];

        const history = [];
        const now = new Date();

        // Generate last 6 hours
        for (let i = 6; i >= 0; i--) {
            const time = new Date(now.getTime() - i * 60 * 60 * 1000);
            // Random fluctuation around current pressure +/- 2 hPa
            // Ensure the *last* point (i=0) is exactly the current pressure
            let val;
            if (i === 0) {
                val = currentPressure;
            } else {
                // Create a trend. mostly stable.
                val = currentPressure + (Math.random() * 4 - 2);
            }

            history.push({
                time: time.getHours() + ':00',
                pressure: Math.round(val)
            });
        }
        return history;
    }, [currentPressure]);

    return (
        <div className="glass-panel p-6 h-full flex flex-col">
            <h3 className="text-xl font-bold mb-4 text-slate-300">Tendência de Pressão (6h)</h3>
            <div className="flex-1 w-full min-h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#64ffda" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#64ffda" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#233554" />
                        <XAxis dataKey="time" stroke="#8892b0" fontSize={12} tickLine={false} />
                        <YAxis domain={['auto', 'auto']} stroke="#8892b0" fontSize={12} tickLine={false} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#112240', border: '1px solid #233554', color: '#fff' }}
                            itemStyle={{ color: '#64ffda' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="pressure"
                            stroke="#64ffda"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorPv)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <p className="text-sm text-slate-500 mt-2 text-center italic">
                *Histórico simulado baseado na leitura atual
            </p>
        </div>
    );
}
