import { createLogger, format, transports, addColors } from "winston";
const { combine, timestamp, label, printf } = format;

const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    verbose: "cyan",
    debug: "white",
    silly: "gray",
};

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

addColors(colors);

console.log(__dirname);

const Logger = createLogger({
    format: combine(label({ label: "right meow!" }), timestamp(), myFormat),

    transports: [
        new transports.Console(),
        new transports.File({ filename: "../storage/logs/combined.log" }),
    ],
});

export default Logger;
