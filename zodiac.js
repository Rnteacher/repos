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

document.getElementById('convertBtn').addEventListener('click', function() {
    const value = document.getElementById('dateInput').value;
    if (!value) return;
    const date = new Date(value + 'T00:00:00');
    const hebrew = new Intl.DateTimeFormat('he-u-ca-hebrew', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
    const western = getWesternZodiac(date);
    const chinese = getChineseZodiac(date.getFullYear());
    document.getElementById('hebrew').textContent = hebrew;
    document.getElementById('western').textContent = western;
    document.getElementById('chinese').textContent = chinese;
    const results = document.getElementById('results');
    results.classList.remove('hidden');
    results.classList.add('show');
});
