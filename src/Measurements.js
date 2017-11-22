class Measurements {
    static textWidth(text) {
        const canvas = document.getElementById('measurements');
        const ctx = canvas.getContext('2d');
        ctx.font = '14px Menlo, Consolas, monospace';

        const metrics = ctx.measureText(text); // TextMetrics object
        return metrics.width;
    }
}

module.exports = Measurements;
