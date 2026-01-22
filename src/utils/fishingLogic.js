/**
 * Calculate the Fishing Index Score (0-10) and Message.
 * 
 * Rules:
 * Pressure (P): Ideal 1013-1018. 
 *  - If < 1005: Penalty -5
 *  - If > 1025: Penalty -3
 *  - Else (non-ideal): Penalty -2 (Generalizing for the gaps)
 * 
 * Wind (W):
 *  - Ideal < 12 km/h: No penalty
 *  - 15-25 km/h: Reduce total score by 40%
 *  - > 30 km/h: Score = 0
 * 
 * @param {number} pressure - Atmospheric pressure in hPa
 * @param {number} windSpeed - Wind speed in km/h
 * @returns {{score: number, message: string, color: string}}
 */
export function calculateFishingIndex(pressure, windSpeed) {
    let score = 10;

    // 1. Pressure Logic
    if (pressure >= 1013 && pressure <= 1018) {
        // Ideal range, no penalty
    } else if (pressure < 1005) {
        score -= 5;
    } else if (pressure > 1025) {
        score -= 3;
    } else {
        // In between non-ideal ranges (1005-1012, 1019-1025)
        score -= 2;
    }

    // Ensure intermediate score doesn't go below 0 before wind multiplier
    score = Math.max(0, score);

    // 2. Wind Logic
    if (windSpeed > 30) {
        score = 0;
    } else if (windSpeed >= 15 && windSpeed <= 25) {
        score = score * 0.6; // Reduce by 40%
    }
    // If wind < 12 or 12-15 (gap not defined strictly, assume safe), keep score.
    // Actually, user said "Ideal below 12". "15-25 reduce". "Above 30 zero". 
    // The gap 12-15 is ambiguous, but let's assume slight penalty or safe. Safe is better for user.
    // Let's apply a small penalty for 12-15 to be nuanced? Or just leave it. 
    // Let's leave it as safe for now, or apply the 40% if closer to 15? 
    // User instruction: "Entre 15-25km/h reduza a nota em 40%". 
    // So 12-14.9 is safe.

    // 3. Final Formatting
    score = Math.round(score * 10) / 10; // Round to 1 decimal place if needed, or integer? User sample was integer range "8-10".
    score = Math.round(score); // Let's simplify to integers for the UI usage.

    // 4. Determine Message & Color
    let message = "";
    let color = ""; // simplified status identifier: 'green', 'yellow', 'red'

    if (score >= 8) {
        message = "Peixe na linha! Condições perfeitas.";
        color = "green";
    } else if (score >= 5) {
        message = "Bom, mas exija paciência. Vento moderado.";
        color = "yellow";
    } else {
        message = "Melhor ficar no trapiche. Condições desfavoráveis.";
        color = "red";
    }

    return { score, message, color };
}
