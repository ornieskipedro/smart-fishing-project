import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function PressureChart({ currentPressure }) {

    const data = useMemo(() => {
        if (!currentPressure) return [];

        // Simulate trend relative to current
        const history = [];
        const now = new Date();

        for (let i = 6; i >= 0; i--) {
            const time = new Date(now.getTime() - i * 60 * 60 * 1000);
            let val;
            if (i === 0) {
                val = currentPressure;
            } else {
                // Subtle variance
                val = currentPressure + (Math.random() * 3 - 1.5);
            }

            history.push({
                time: time.getHours() + ':00',
                pressure: Number(val.toFixed(1))
            });
        }
        return history;
    }, [currentPressure]);

    return (
        <div className="glass-panel p-4 md:p-6 h-full flex flex-col justify-between min-h-[250px]">
            <div className="mb-4 flex flex-col">
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest">Tendência Barométrica</h3>
                <span className="text-xs text-gray-600">Últimas 6 horas</span>
            </div>

            <div className="flex-1 w-full relative -ml-2">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#5eb3b7" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#5eb3b7" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#ffffff10" />
                        <XAxis
                            dataKey="time"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 10 }}
                            dy={10}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#2d2d2d',
                                borderColor: 'rgba(255,255,255,0.05)',
                                borderRadius: '8px',
                                color: '#f5f5f5',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
                            }}
                            itemStyle={{ color: '#5eb3b7' }}
                            formatter={(value) => [`${value} hPa`, 'Pressão']}
                        />
                        <Area
                            type="monotone"
                            dataKey="pressure"
                            stroke="#5eb3b7"
                            strokeWidth={2}
                            fill="url(#colorPv)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
