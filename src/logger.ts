import winston from "winston";

const { combine, timestamp, printf, errors } = winston.format;

const logFormat = printf(({ timestamp, level, message, stack }) => {
	if (stack) {
		return `${timestamp} [${level}]: ${message}\n${stack}`;
	}
	return `${timestamp} [${level}]: ${message}`;
});

const logger = winston.createLogger({
	level: "info",
	format: combine(timestamp(), errors({ stack: true }), logFormat),
	transports: [
		new winston.transports.Console({
			format: winston.format.combine(winston.format.colorize(), logFormat),
		}),
		new winston.transports.File({ filename: "app.log" }),
	],
});

export default logger;
