import { LoggingsMessage } from "../types.ts";
import { LoggingsColors } from "./pallet.ts";
/**
 * Loggings Internal Colors, simple Loggings color system
 * @param colorKey Color key
 * @param text LoggingsText
 * @returns
 */
export declare function Colors(colorKey: keyof typeof LoggingsColors, text: LoggingsMessage, extra_colors?: Record<string, string>): string;
