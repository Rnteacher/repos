function getWesternZodiac(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1; // months start at 0
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return 'Aquarius';
    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return 'Pisces';
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return 'Aries';
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return 'Taurus';
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return 'Gemini';
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return 'Cancer';
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return 'Leo';
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return 'Virgo';
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return 'Libra';
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return 'Scorpio';
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return 'Sagittarius';
    return 'Capricorn';
}

function getChineseZodiac(year) {
    const animals = ['Rat','Ox','Tiger','Rabbit','Dragon','Snake','Horse','Goat','Monkey','Rooster','Dog','Pig'];
    return animals[(year - 4) % 12];
}

const GERESH = '\u05F3'; // ׳
const GERSHAYIM = '\u05F4'; // ״

function numberToHebrew(num) {
    const units = ['', 'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט'];
    const tens = ['', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ'];
    const hundreds = ['', 'ק', 'ר', 'ש', 'ת', 'תק', 'תר', 'תש', 'תת', 'תתק'];

    let result = '';
    const h = Math.floor(num / 100);
    if (h) result += hundreds[h];

    let rem = num % 100;
    if (rem === 15) result += 'טו';
    else if (rem === 16) result += 'טז';
    else {
        const t = Math.floor(rem / 10);
        if (t) result += tens[t];
        const o = rem % 10;
        if (o) result += units[o];
    }

    if (result.length > 1) result = result.slice(0, -1) + GERSHAYIM + result.slice(-1);
    else if (result.length === 1) result += GERESH;
    return result;
}

function formatHebrewDate(date) {
    const parts = new Intl.DateTimeFormat('he-u-ca-hebrew', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).formatToParts(date);

    let day = 0, month = '', year = 0;
    for (const p of parts) {
        if (p.type === 'day') day = parseInt(p.value, 10);
        else if (p.type === 'month') month = p.value;
        else if (p.type === 'year') year = parseInt(p.value, 10);
    }

    const thousands = Math.floor(year / 1000);
    const rest = year % 1000;
    const yearHeb = (thousands ? numberToHebrew(thousands) : '') + numberToHebrew(rest);

    return `${numberToHebrew(day)} ב${month} ${yearHeb}`;
}

document.getElementById('convertBtn').addEventListener('click', function () {
    const value = document.getElementById('dateInput').value;
    if (!value) return;
    const date = new Date(value + 'T00:00:00');
    const hebrew = formatHebrewDate(date);
    const western = getWesternZodiac(date);
    const chinese = getChineseZodiac(date.getFullYear());
    document.getElementById('hebrew').textContent = hebrew;
    document.getElementById('western').textContent = western;
    document.getElementById('chinese').textContent = chinese;
    const results = document.getElementById('results');
    results.classList.remove('hidden');
    results.classList.add('show');
});
