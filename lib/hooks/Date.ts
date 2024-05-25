function calculateRoundedOffsetInMinutes(offsetInMinutes: number): Date {
    const now = new Date();
    const offsetInMilliseconds = offsetInMinutes * 60 * 1000;
    const offsetDate = new Date(now.getTime() + offsetInMilliseconds);

    const roundedMinutes = Math.round(offsetDate.getMinutes() / 5) * 5;

    offsetDate.setMinutes(roundedMinutes);

    if (Math.abs(offsetInMinutes - (offsetDate.getTime() - now.getTime()) / 60000) > 5) {
        if (offsetInMinutes > 0) {
            offsetDate.setMinutes(roundedMinutes - 5);
        } else {
            offsetDate.setMinutes(roundedMinutes + 5);
        }
    }

    return offsetDate;
}

function getFormattedDate(date: Date, formatedDate: string): string {
    return formatedDate
        .replace("YYYY", date.getFullYear().toString())
        .replace("MM", (date.getMonth() + 1).toString().padStart(2, "0"))
        .replace("DD", date.getDate().toString().padStart(2, "0"))
        .replace("hh", date.getHours().toString().padStart(2, "0"))
        .replace("mm", date.getMinutes().toString().padStart(2, "0"));
}

export function useDate() {
    return {
        calculateRoundedOffsetInMinutes,
        getFormattedDate,
    };
}
