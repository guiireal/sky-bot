export * from "./libs/functions/colors.ts";
export * from "./libs/functions/formatter.ts";
export * from "./libs/functions/fragmenter.ts";
export * from "./libs/functions/pallet.ts";
export * from "./libs/functions/timer.ts";
export * from "./libs/class/plugin.ts";
export * from "./libs/plugins/console/index.ts";
export * from "./libs/plugins/register/index.ts";
import { LoggingsColors } from "./libs/functions/pallet.ts";
import { LoggingsConsoleConfig } from "./libs/plugins/console/types.ts";
import { LoggingsRegisterConfig } from "./libs/plugins/register/types.ts";
import { LoggingsCORE } from "./libs/class/core.ts";
import { LoggingsPluginData } from "./libs/class/plugin.ts";
/**
 * Configuration of Loggings
 */
export type LoggingsConfig = LoggingsConsoleConfig & LoggingsRegisterConfig;
/**
 * Class of Loggings for Node js
 */
export declare class Loggings<ExtendedLoggingsConfig extends {} extends LoggingsPluginData<Record<string, string>> ? ExtendedLoggingsConfig : LoggingsPluginData<Record<string, string>>> extends LoggingsCORE<ExtendedLoggingsConfig> {
    /**
     * Configures global logging methods to use the provided Loggings instance.
     *
     * This method overrides the default console methods (log, error, warn, info, debug)
     * to use the corresponding methods from the provided Loggings instance. It allows
     * for custom logging behaviors such as using colors and recording logs/errors in the terminal.
     *
     * @param logger - An instance of Loggings to handle the logging.
     */
    static useConsole(logger: InstanceType<typeof Loggings>): void;
    constructor(title?: string, color?: keyof typeof LoggingsColors, advanced?: Partial<LoggingsConfig>);
    config(conf: Partial<LoggingsConfig>): void;
    static config(conf: Partial<LoggingsConfig>): void;
    static getDefaults(): any;
}
