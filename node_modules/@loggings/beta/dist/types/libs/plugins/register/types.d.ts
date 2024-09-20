import { LoggingsLevel } from "../../types";
export type LoggingsRegisterConfig = {
    /**
     * Allows register logs in file, on {register_dir}
     */
    register: boolean;
    /**
     * Allows you to delete the logs, if you exceed the limit configured
     * in "register_limit", if "register_limit" is 0, it will be ignored
     */
    register_del: boolean;
    /**
     * Loggings Level
     * Register-specific level will be used, if not used
     * will use the global "level"
     */
    register_level?: LoggingsLevel;
    /**
     * Sets how many log files will be needed to start deleting old files,
     * if "register_del" is disabled or the value set is 0,
     * this option will be ignored
     */
    register_limit: number;
    /**
     * Directory where the files will be stored, if "register" is disabled, it will be ignored
     */
    register_dir: string;
    /**
     * Register Format locale file.
     *
     * Suported Args:  {register_dir} | {status} | {title}
     *
     * Default: {register_dir}/{title}/{status}
     */
    register_locale_file: string;
    /**
     * Register File Format locale file.
     *
     * Main Args:  {ext} | {status}
     *
     * Timer Args: {day} | {month} | {year} | {hours} | {minutes}| {seconds} | {milliseconds}
     *
     * Default:
     * ```js
       const format = "{day}_{month}_{year}_{status}.{ext}";
       ```
     */
    register_filename: string;
    /**
     * Register Format, in registration logs,
     *
     * Main Args:  {status} | {message} | {title}
     *
     * Timer Args: {day} | {month} | {year} | {hours} | {minutes}| {seconds} | {milliseconds}
     *
     * Default: [ {day}/{month}/{year} ás {hours}:{minutes}:{seconds} ] [ _.{title}._ ]{message}
     */
    register_format: string;
};
