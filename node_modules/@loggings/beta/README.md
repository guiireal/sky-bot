## Loggings

Loggings is a simple logging system for your Node.js applications, with support for colors.

### Installation

You can install Loggings via npm:

```bash
npm install loggings
```

### Configuration

The loggings itself already has an internal configuration, but it also has support for customization, the logs can be configured using a configuration file if necessary. Here are examples of how to configure logs using TypeScript, JavaScript, and JSON formats:

#### TypeScript (loggings.config.ts)

```typescript
import { LoggingsConfig } from "loggings";

LoggingsConfig({
    register_dir: "./Logs",
});
```

#### JavaScript (loggings.config.js)

```javascript
/** @type {import('loggings').LoggingsOptionalConfig} */
const { LoggingsConfig } = require("loggings");
LoggingsConfig({
    register_dir: "./Logs",
});
```

#### JSON (loggings.config.json)

```json
{
    "register_dir": "./Logs"
}
```
#### Configuration Arguments

Check [Configurations](./docs/Configurations.md)

### Usage

Once configured, you can start using Loggings in your Node.js application. Here's a basic example:

```typescript
import { Loggings } from "loggings";
const logger = new Loggings("Loggings","blue")
logger.error("This is an error message");
logger.warn("This is an warn message");
logger.info("This is an info message");
logger.log("This is alias of info message");
logger.debug("This is alias of info message");
logger.txt("This only registered message, not console viewer");
```

### Alternatively

Now modify the node js console to use loggings:

```typescript
import { Loggings } from "loggings";
const logger = new Loggings("Loggings","blue")
Loggings.useConsole(logger);

console.error("This is an [error].red message");
console.warn("This is an [warn].yellow message");
console.info("This is an [info].blue message");
console.log("This is alias of [info].blue message");
console.debug("This is alias of [debug].magenta message");
console.txt("This only registered message, not console viewer");
```

Use Colors in string Check Supported Colors in [Colors](./docs/Colors.md)

```typescript
import { Loggings } from "loggings";
const logger = new Loggings("Loggings","blue")
/**
 * Use [].colorname to color text
 * use -b for bold + colorname
 */

logger.info("This is [Green].green");
logger.info("This is [Green Bold].green-b");
logger.info("This is [Red Bold].red-b");
logger.info("This is [Red].red");
```

Console Args use

```typescript
import { Loggings } from "loggings";
const logger = new Loggings("Loggings","blue")

// number is blue color in terminal
logger.info(1,"is [Number].blue");

// number is green color in terminal
logger.info({loggings:{ is:"Cool"} },"is [Object].green");

// boolean is blue or red
logger.info(true,"is [Boolean].blue"); // blue
logger.info(false,"is [Boolean].red"); // red
```

### Exemples

Check [Exemples](./exemples/)

### Optionals

In addition to the default configuration configured by loggings and the user, it is also possible to use personal configurations in each loggings class call, exemple:

```typescript
import { Loggings } from "loggings";
const logger = new Loggings("Loggings","blue", {
    format: '[{status}] [{hours}:{minutes}:{seconds}].magenta {message}',
    register:false, // not allow register files, only show visual messages
})
logger.error("This is an error message");
logger.warn("This is an warn message");
logger.info("This is an info message");
logger.log("This is alias of info message");
logger.debug("This is an debug message");
logger.txt("This only registered message, not console viewer");
```

### Extra Function Progress

Loggings has an extra progress system, an example of how to use it below:

```typescript
import { Progress } from "./src/Loggings";

// Create a new instance of Progress
const progressBar = new Progress();

// Add a total of 100 units to the progress bar, for exemple, however, counts such as kbs, files and many other cases can be used
progressBar.add(100);
// progressBar.rem(100); // case need remove counts of total,, 

// Set a message for the progress bar
progressBar.msg("Processing...");
// Show the progress bar and update it for each completed unit
const interval = setInterval(() => {
    // Update the progress bar
    // Check if the progress bar has reached 100%
    if (progressBar.meta.current >= progressBar.meta.total - 1) {
        // Finish the interval
        clearInterval(interval);
        progressBar.msg("Complete!");
        // Finish the progress bar and get the data
        progressBar.end();
    } else {
        progressBar.cmt();
    }
}, 100);

```
### License

This project is licensed under the Apache-2.0 License. See the [LICENSE](LICENSE) file for details.

### Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue on the [GitHub repository](https://github.com/drylian/loggings).

### Support

For help or questions about using Loggings, please contact us at daniel.alternight@gmail.com.
