import { console_defaults } from "../console/defaults.ts";
import { register_defaults } from "./defaults.ts";
import { LoggingsPluginData } from "../../class/plugin.ts";
export declare const LoggingsRegister: LoggingsPluginData<typeof register_defaults & typeof console_defaults>;
