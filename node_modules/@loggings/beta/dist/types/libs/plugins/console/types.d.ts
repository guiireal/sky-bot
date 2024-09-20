import { LoggingsColors } from "../../functions/pallet.ts";
import { LoggingsLevel } from "../../types.ts";
export type LoggingsConsoleConfig = {
    /**
     * Format log Message, Console print.
     *
     * Main Args:  {status} | {message} | {title}
     *
     * Timer Args: {day} | {month} | {year} | {hours} | {minutes}| {seconds} | {milliseconds}
     *
     * Default: [{status}] [{{hours}:{minutes}:{seconds}}].gray {message}
     */
    format: string;
    /**
     * Loggings Level
     * Console-specific level will be used, if not used
     * will use the global "level"
     */
    console_level?: LoggingsLevel;
    /**
     * Status colors
     */
    status: Record<string, keyof typeof LoggingsColors>;
    /**
     * Add new Colors code(ansi or rgb code colors), used in logs functions,
     * e.g:
     * ```ts
     * const logger = new Loggings();
     * LoggingsConfig({
     *     colors: {
     *          "ngreen": Rgb(57, 255, 20) // Neon Green
     *     }
     * })
     * logger.log("[Hello].ngreen")
     * ```
     */
    colors?: Record<string, string>;
    /**
     * If any color using the [].color declaration is wrong,
     * we will use that color instead.
     */
    color_fallback: keyof typeof LoggingsColors;
    /**
     * In some types of hosting, the terminal does not support
     * ansi colors or uses the terminal to display logs.
     * The loggings module uses arguments that apply colors to the terminal
     * using ansi codes, which can make logs difficult to read when saved in
     * .txt files due to the presence of several random characters.
     *
     * To solve this problem, this boolean has been added, that,
     * when activated, causes the loggings module to ignore the color codes
     * and imprint simple logs on the terminal, without color formatting.
     *
     * Hosts that this boolean becomes useful:
     * [Discloud, Squarecloud]
     */
    disable_colors: boolean;
    /**
     * Global Level for show/register logs,
     * Used if console_level or register_level are not set
     * Suported Levels: "error" | "warn" | "info" | "debug"
     */
    level: LoggingsLevel;
    /**
     * Allows show logs in terminal
     */
    console: boolean;
    /**
     * Title show in {title} arg, but is used in logs register.
     * Case "register" is allowed
     */
    title: string;
    /**
     * Color in {title} arg, only visual.
     */
    color: keyof typeof LoggingsColors;
};
