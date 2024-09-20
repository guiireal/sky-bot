import { LoggingsMessage } from "../types.ts";
/**
 * Formatter of Colors
 * Returns formatted message with and out colors
 * ```ts
 * const [with_color,out_color] = Formatter("I Am [Green].green!");
 * console.log(with_color,out_color)
 * ```
 */
export declare function Formatter(...messages: LoggingsMessage[]): string[];
export declare function StaticFormatter(colors: Record<string, string>, ...messages: LoggingsMessage[]): string[];
