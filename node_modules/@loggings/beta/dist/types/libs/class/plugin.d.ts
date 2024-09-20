import { LoggingsLevel, LoggingsMessage } from "../types.ts";
import { LoggingsCORE } from "./core.ts";
/**
 * Interface representing the data for logging plugins.
 *
 * @template Defaults - Type of the plugin's default values.
 */
export interface LoggingsPluginData<Defaults> {
    /** Unique identification of the plugin. */
    identify: string;
    /** Default values for the plugin. */
    defaults: Defaults;
    /**
     * Function called when a message is received.
     *
     * @param {LoggingsPluginOnMessage<Defaults>} configs - Plugin configurations.
     * @param {LoggingsMessage[]} args - List of log messages.
     * @returns {unknown} - The result of the function execution.
     */
    onMessage?(configs: Defaults, level: LoggingsLevel, args: LoggingsMessage[]): unknown;
    /**
     * Function called when creating an instance of the plugin.
     *
     * @template InstanceConfigs - Type of the instance's configurations.
     * @param {LoggingsCORE<InstanceConfigs>} instance - The core instance created.
     * @returns {unknown} - The result of the function execution.
     */
    onCreateInstance?<InstanceConfigs extends {} extends LoggingsPluginData<object> ? InstanceConfigs : LoggingsPluginData<object>>(instance: LoggingsCORE<InstanceConfigs>): unknown;
    /**
     * Function called when adding a plugin.
     *
     * @param {LoggingsPluginData<PluginData>} plugin - The plugin to be added.
     * @returns {unknown} - The result of the function execution.
     */
    onAddPlugin?<PluginData>(plugin: LoggingsPluginData<PluginData>): unknown;
    /**
     * Function called when removing a plugin.
     *
     * @param {LoggingsPluginData<PluginData>} plugin - The plugin to be removed.
     * @returns {unknown} - The result of the function execution.
     */
    onRemPlugin?<PluginData>(plugin: LoggingsPluginData<PluginData>): unknown;
}
/**
 * Creates a new logging plugin.
 *
 * @template Defaults - Type of the plugin's default values.
 * @param {LoggingsPluginData<Defaults>} opts - Plugin options.
 * @returns {object} - The created plugin.
 */
export declare function LoggingsPlugin<Defaults>(opts: LoggingsPluginData<Defaults>): {
    identify: string;
    defaults: {};
    onMessage: (configs: Defaults, level: LoggingsLevel, args: LoggingsMessage[]) => unknown;
    onCreateInstance: <InstanceConfigs extends {} extends LoggingsPluginData<object> ? InstanceConfigs : LoggingsPluginData<object>>(instance: LoggingsCORE<InstanceConfigs>) => unknown;
    onAddPlugin: <PluginData>(plugin: LoggingsPluginData<PluginData>) => unknown;
    onRemPlugin: <PluginData>(plugin: LoggingsPluginData<PluginData>) => unknown;
};
/**
 * Type representing the return value of the LoggingsPlugin function.
 *
 * @type {LoggingsPluginLoader}
 */
export type LoggingsPluginLoader = Required<LoggingsPluginData<any>>;
