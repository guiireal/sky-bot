import { LoggingsCORE } from "./libs/class/core.ts";
import { LoggingsPluginData } from "./libs/class/plugin.ts";
declare global {
    var loggings: LoggingsCORE<LoggingsPluginData<object>>;
    interface globalThis {
        loggings?: LoggingsCORE<LoggingsPluginData<object>>;
    }
}
