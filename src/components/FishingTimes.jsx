import React, { useMemo } from 'react';
import { Sun, Moon, Clock } from 'lucide-react';

export default function FishingTimes({ sunrise, sunset }) {

    const times = useMemo(() => {
        if (!sunrise || !sunset) return [];

        const formatTime = (timestamp) => {
            return new Date(timestamp * 1000).toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit'
            });
        };

        // Major 1: Sunrise -1h to +1h
        const srDate = new Date(sunrise * 1000);
        const srStart = new Date(srDate.getTime() - 3600000); // -1h
        const srEnd = new Date(srDate.getTime() + 3600000);   // +1h

        // Major 2: Sunset -1h to +1h
        const ssDate = new Date(sunset * 1000);
        const ssStart = new Date(ssDate.getTime() - 3600000); // -1h
        const ssEnd = new Date(ssDate.getTime() + 3600000);   // +1h

        return [
            {
                label: "Manhã",
                period: `${srStart.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} - ${srEnd.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
                icon: Sun,
                color: "text-amber-400"
            },
            {
                label: "Tarde/Noite",
                period: `${ssStart.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} - ${ssEnd.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
                icon: Moon,
                color: "text-blue-400"
            }
        ];
    }, [sunrise, sunset]);

    if (!sunrise || !sunset) return null;

    return (
        <div className="glass-panel p-6 h-full flex flex-col justify-center min-h-[150px]">
            <div className="mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest">Horários de Pico</h3>
            </div>

            <div className="space-y-4">
                {times.map((t, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/5">
                        <div className="flex items-center gap-3">
                            <div className={`p-1.5 rounded-full bg-black/20 ${t.color}`}>
                                <t.icon className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium text-gray-300">{t.label}</span>
                        </div>
                        <span className="text-lg font-bold text-text-main tracking-tight">{t.period}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
