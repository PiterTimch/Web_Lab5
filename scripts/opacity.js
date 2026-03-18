function lerp(a, b, t) {
    return a + (b - a) * t;
}

function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

function showOpacity(str, options) {
    const { color1, color2, opacity1, opacity2, centerShift } = options;

    const length = str.length;
    let result = '';

    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);

    for (let i = 0; i < length; i++) {
        let t = i / (length - 1 || 1);

        t = t - centerShift;
        t = Math.max(0, Math.min(1, t));

        const r = Math.round(lerp(c1.r, c2.r, t));
        const g = Math.round(lerp(c1.g, c2.g, t));
        const b = Math.round(lerp(c1.b, c2.b, t));

        const opacity = lerp(opacity1, opacity2, t);

        result += `<span style="color: rgb(${r},${g},${b}); opacity:${opacity}">
            ${str[i]}
        </span>`;
    }

    return result;
}

function update() {
    const text = document.getElementById('text').value;
    const result = document.getElementById('result');

    if (!text) {
        result.innerHTML = '';
        return;
    }

    const options = {
        color1: document.getElementById('color1').value,
        color2: document.getElementById('color2').value,
        opacity1: parseFloat(document.getElementById('opacity1').value),
        opacity2: parseFloat(document.getElementById('opacity2').value),
        centerShift: parseFloat(document.getElementById('centerShift').value)
    };

    result.innerHTML = showOpacity(text, options);
}