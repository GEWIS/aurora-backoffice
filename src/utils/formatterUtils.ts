export function formatDateTime(date: Date): string {

    const daysOfWeek: Array<string> = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    const day = parseTime(date.getDate());
    const monthIndex = parseTime(date.getMonth());
    const year = date.getFullYear().toString();
    const dayOfWeek = daysOfWeek[date.getDay()];
    return `${day}-${monthIndex}-${year} (${dayOfWeek})`;
}

export function formatLastSeen(date: Date) {
    const year = date.getFullYear().toString();
    const months = date.getMonth() + 1;
    const days = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return [
        days.toString().padStart(2, '0'),
        months.toString().padStart(2, '0'),
        year.toString(),
    ].join('-') + ' at ' + [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0'),
    ].join(':');
}

function parseTime(value: number): string {
    return value.toString().padStart(2, '0');
}

export function formatPrice(cents: number): string {
    return (cents / 100).toLocaleString('en', { style: 'currency', currency: 'EUR' });
}
