function checkPalindrome() {
    const input = document.getElementById('text').value;
    const clean = input.toLowerCase().replace(/\s/g, '');
    const reversed = clean.split('').reverse().join('');

    const result = document.getElementById('result');

    if (!clean) {
        result.innerHTML = '';
        return;
    }

    const isPalindrome = clean === reversed;

    result.innerHTML = `
        <div class="alert ${isPalindrome ? 'alert-success' : 'alert-error'}">
            <div><strong>Обернений рядок:</strong> ${reversed}</div>
            <div style="margin-top:8px;">
                ${isPalindrome ? 'Це паліндром' : 'Не є паліндромом'}
            </div>
        </div>
    `;
}