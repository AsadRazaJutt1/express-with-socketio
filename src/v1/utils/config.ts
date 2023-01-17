import dotenv from "dotenv";
dotenv.config();

function getValue<T>(key: string, defaultValue: T) {
    const value = process.env[key];
    return value ?? defaultValue;
}

export const Config = {
    appName: getValue("APP_NAME", "app"),
    port: getValue("PORT", 3000),
    env: getValue("NODE_ENV", "development"),
    db: {
        host: getValue("DB_HOST", "localhost"),
        port: getValue("DB_PORT", 5432),
        name: getValue("DB_NAME", "app"),
    },
    jwt: {
        secret: getValue("JWT_SECRET", "secret"),
        expiresIn: getValue("JWT_EXPIRES_IN", "15m"),
    },
    mail: {
        host: getValue("MAIL_HOST", "smtp.mailtrap.io"),
        port: getValue("MAIL_PORT", 2525),
        user: getValue("MAIL_USER", "user"),
        pass: getValue("MAIL_PASS", "pass"),
    },
};
