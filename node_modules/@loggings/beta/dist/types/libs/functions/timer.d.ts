export declare enum Timers {
    year = "year",
    month = "month",
    day = "day",
    hours = "hours",
    minutes = "minutes",
    seconds = "seconds",
    milliseconds = "milliseconds"
}
/**
 * Calc timer format
 * @param uptime Timestamp
 * @param mili enable milliseconds
 * @returns
 */
export declare function Uptimer(uptime: number, mili?: boolean): string;
/**
 * Put time in Args {day} | {month} | {year} | {hours} | {minutes}| {seconds} | {milliseconds}
 * @param format
 * @returns
 */
export declare function Timer(format: string): {
    format: string;
    timer: {
        timestamp: number;
        year: string;
        month: string;
        day: string;
        hours: string;
        minutes: string;
        seconds: string;
        milliseconds: string;
    };
};
