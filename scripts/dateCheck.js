const input = document.getElementById('dateInput');
const error = document.getElementById('error');

input.addEventListener('input', () => {
    const value = input.value.trim();

    if (!value) {
        error.innerHTML = '';
        return;
    }

    const normalized = value.replace(/[-\/,\s]+/g, '.');
    const parts = normalized.split('.').map(Number);

    let suggestion = null;

    function isValidDate(d, m, y) {
        const date = new Date(y, m - 1, d);
        return (
            date.getFullYear() === y &&
            date.getMonth() === m - 1 &&
            date.getDate() === d
        );
    }

    if (parts.length === 3) {
        let [a, b, c] = parts;

        if (isValidDate(a, b, c)) {
            error.innerHTML = `<div class="alert alert-success">Дата коректна</div>`;
            return;
        }

        if (isValidDate(c, b, a)) {
            suggestion = `${c.toString().padStart(2,'0')}.${b.toString().padStart(2,'0')}.${a}`;
        }

        if (isValidDate(b, a, c)) {
            suggestion = `${b.toString().padStart(2,'0')}.${a.toString().padStart(2,'0')}.${c}`;
        }
    }

    const regex = /^([0-2]\d|3[01])\.(0\d|1[0-2])\.(\d{4})$/;

    if (!regex.test(normalized)) {
        error.innerHTML = `
            <div class="alert alert-error">
                Невірний формат дати
                ${suggestion ? `<br><strong>Ви мали на увазі:</strong> ${suggestion}?` : ''}
            </div>
        `;
        return;
    }

    const [day, month, year] = normalized.split('.').map(Number);

    if (!isValidDate(day, month, year)) {
        error.innerHTML = `
            <div class="alert alert-error">
                Такої дати не існує
                ${suggestion ? `<br><strong>Ви мали на увазі:</strong> ${suggestion}?` : ''}
            </div>
        `;
    } else {
        error.innerHTML = `<div class="alert alert-success">Дата коректна</div>`;
    }
});