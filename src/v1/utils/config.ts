export const Config = {
    name: process.env.NAME ?? "API",
    port: process.env.PORT ?? 3000,
    env: process.env.NODE_ENV ?? "development",
    db: {
        host: process.env.DB_HOST ?? "localhost",
        port: process.env.DB_PORT ?? "",
        name: process.env.DB_NAME ?? "",
    },
    jwt: {
        secret: process.env.JWT_SECRET ?? "secret",
        expiresIn: process.env.JWT_EXPIRES_IN ?? "10m",
    },
    mail: {
        host: process.env.MAIL_HOST ?? "smtp.mailtrap.io",
        port: process.env.MAIL_PORT ?? 2525,
        user: process.env.MAIL_USER ?? "user",
        pass: process.env.MAIL_PASS ?? "",
    },
};
