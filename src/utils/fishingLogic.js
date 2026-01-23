/**
 * Smart Fishing Dashboard 2.0 Logic
 */

export const idealConditions = {
    temperature: { min: 15, max: 28, optimal: 22 },
    windSpeed: { min: 0, max: 15, optimal: 5 },
    pressure: { min: 1013, max: 1023, optimal: 1020 },
    humidity: { min: 40, max: 80, optimal: 60 }
};

/**
 * Calculates a 0-10 fishing score based on weather conditions.
 * @param {Object} data - { temperature, windSpeed, pressure, humidity }
 * @returns {number} Score from 0 to 10
 */
export function calculateFishingScore(data) {
    let score = 10;
    const { temp, windSpeed, pressure, humidity } = data; // Note: input uses 'temp' usually from API

    // Penalties
    // Temperature
    if (temp < idealConditions.temperature.min || temp > idealConditions.temperature.max) {
        score -= 2;
    }

    // Wind
    if (windSpeed > idealConditions.windSpeed.max) {
        score -= 3;
    }

    // Pressure
    if (pressure < idealConditions.pressure.min || pressure > idealConditions.pressure.max) {
        score -= 2;
    }

    // Humidity
    if (humidity < idealConditions.humidity.min || humidity > idealConditions.humidity.max) {
        score -= 1;
    }

    return Math.max(0, score);
}

/**
 * Returns dynamic UI properties based on the score.
 * @param {number} score 
 * @returns {{title: string, message: string, gradient: string, colorClass: string}}
 */
export function getConditionMessage(score) {
    if (score >= 9) return {
        title: 'Condições Ideais!',
        message: 'Peixe na linha! Momento perfeito para pescar.',
        gradient: 'from-cyan-500 to-blue-600',
        colorClass: 'text-cyan-600'
    };
    if (score >= 7) return {
        title: 'Condições Boas',
        message: 'Ótimo momento para uma pescaria produtiva.',
        gradient: 'from-green-500 to-emerald-600',
        colorClass: 'text-green-600'
    };
    if (score >= 5) return {
        title: 'Condições Regulares',
        message: 'Dá pra pescar, mas não é o ideal.',
        gradient: 'from-yellow-500 to-orange-600',
        colorClass: 'text-yellow-600'
    };
    if (score >= 3) return {
        title: 'Condições Ruins',
        message: 'Melhor aguardar condições melhores.',
        gradient: 'from-orange-500 to-red-600',
        colorClass: 'text-orange-600'
    };
    return {
        title: 'Condições Péssimas',
        message: 'Não recomendado pescar agora.',
        gradient: 'from-red-500 to-red-700',
        colorClass: 'text-red-600'
    };
}
