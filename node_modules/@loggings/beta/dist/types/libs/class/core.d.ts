import { LoggingsLevel, LoggingsMessage } from "../types.ts";
import { LoggingsPluginData, LoggingsPluginLoader } from "./plugin.ts";
import { Console } from "node:console";
/**
 * Loggings Core Class
 *
 * @class LoggingsCORE
 * @extends Console
 *
 * @description
 * This class extends the native Node.js `Console` and acts as the core logging
 * system. It allows for the addition of plugins that can modify and handle
 * log messages in various ways. The class provides methods for logging
 * different levels of messages (`info`, `error`, `trace`, `debug`, `warn`).
 */
export declare class LoggingsCORE<LoggingsConfig extends LoggingsPluginData<object>> extends Console {
    /**
     * Static configurations for all instances of LoggingsCORE.
     *
     * @type {Record<string, unknown>}
     * @static
     */
    static configs: Record<string, unknown>;
    /**
     * Instance-specific configurations.
     *
     * @type {LoggingsConfig}
     */
    configs: LoggingsConfig["defaults"];
    /**
     * List of active plugins for the logging system.
     *
     * @type {LoggingsPluginLoader[]}
     * @static
     */
    static plugins: LoggingsPluginLoader[];
    /**
     * List of active plugins for the instance logging system.
     *
     * @type {LoggingsPluginLoader[]}
     * @static
     */
    plugins: LoggingsPluginLoader[];
    /**
     * Resets the plugin list, removing all active plugins.
     *
     * @static
     */
    static reset(): void;
    /**
     * Resets the plugin list, removing all active plugins.
     *
     * @static
     */
    reset(): void;
    /**
     * Adds one or more plugins to the logging system.
     *
     * @param {...LoggingsPluginLoaderData[]} plugins - Plugins to be added.
     *
     * @static
     */
    static add(...plugins: LoggingsPluginData<unknown>[]): void;
    /**
     * Adds one or more plugins to the logging system.
     *
     * @param {...LoggingsPluginLoader[]} plugins - Plugins to be added.
     *
     * @static
     */
    add(...plugins: LoggingsPluginLoader[]): void;
    /**
     * Retrieves a plugin by its identifier.
     *
     * @param {string} ident - The identifier of the plugin.
     * @returns {LoggingsPluginLoader | undefined} - The found plugin or undefined if not found.
     *
     * @static
     */
    static get<Plugin extends LoggingsPluginLoader>(ident: string): Plugin;
    /**
     * Retrieves a plugin by its identifier.
     *
     * @param {string} ident - The identifier of the plugin.
     * @returns {LoggingsPluginLoader | undefined} - The found plugin or undefined if not found.
     *
     * @static
     */
    get<Plugin extends LoggingsPluginLoader>(ident: string): Plugin;
    /**
     * Removes a plugin by its identifier.
     *
     * @param {string} ident - The identifier of the plugin to be removed.
     *
     * @static
     */
    static rem(ident: string): void;
    /**
     * Removes a plugin by its identifier.
     *
     * @param {string} ident - The identifier of the plugin to be removed.
     *
     * @static
     */
    rem(ident: string): void;
    /**
     * Internal controller method that passes log messages to all active plugins.
     *
     * @param {LoggingsMessage[]} msgs - The messages to be logged.
     * @param {LoggingsLevel} type - The log level (info, error, trace, debug, warn).
     */
    controller(msgs: LoggingsMessage[], type: LoggingsLevel): void;
    /**
     * Logs a message with "info" level.
     *
     * @param {...LoggingsMessage[]} messages - The messages to be logged.
     */
    log(...messages: LoggingsMessage[]): void;
    /**
     * Logs a message with "error" level.
     *
     * @param {...LoggingsMessage[]} messages - The messages to be logged.
     */
    error(...messages: LoggingsMessage[]): void;
    /**
     * Logs a message with "trace" level.
     *
     * @param {...LoggingsMessage[]} messages - The messages to be logged.
     */
    trace(...messages: LoggingsMessage[]): void;
    /**
     * Logs a message with "debug" level.
     *
     * @param {...LoggingsMessage[]} messages - The messages to be logged.
     */
    debug(...messages: LoggingsMessage[]): void;
    /**
     * Logs a message with "warn" level.
     *
     * @param {...LoggingsMessage[]} messages - The messages to be logged.
     */
    warn(...messages: LoggingsMessage[]): void;
    /**
     * Logs a message with "info" level (alias for `log`).
     *
     * @param {...LoggingsMessage[]} messages - The messages to be logged.
     */
    info(...messages: LoggingsMessage[]): void;
    /**
     * Internal controller method that passes log messages to all active plugins.
     *
     * @param {LoggingsMessage[]} msgs - The messages to be logged.
     * @param {LoggingsLevel} type - The log level (info, error, trace, debug, warn).
     */
    static controller(msgs: LoggingsMessage[], type: LoggingsLevel): void;
    /**
     * Logs a message with "info" level.
     *
     * @param {...LoggingsMessage[]} messages - The messages to be logged.
     */
    static log(...messages: LoggingsMessage[]): void;
    /**
     * Logs a message with "error" level.
     *
     * @param {...LoggingsMessage[]} messages - The messages to be logged.
     */
    static error(...messages: LoggingsMessage[]): void;
    /**
     * Logs a message with "trace" level.
     *
     * @param {...LoggingsMessage[]} messages - The messages to be logged.
     */
    static trace(...messages: LoggingsMessage[]): void;
    /**
     * Logs a message with "debug" level.
     *
     * @param {...LoggingsMessage[]} messages - The messages to be logged.
     */
    static debug(...messages: LoggingsMessage[]): void;
    /**
     * Logs a message with "warn" level.
     *
     * @param {...LoggingsMessage[]} messages - The messages to be logged.
     */
    static warn(...messages: LoggingsMessage[]): void;
    /**
     * Logs a message with "info" level (alias for `log`).
     *
     * @param {...LoggingsMessage[]} messages - The messages to be logged.
     */
    static info(...messages: LoggingsMessage[]): void;
}
