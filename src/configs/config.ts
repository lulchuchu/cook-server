import "dotenv/config";

const dev = {
    app: {
        host: process.env.DEV_HOST || "localhost",
        port: process.env.DEV_PORT || 3056,
    },
    db: {
        host: process.env.DEV_DB_HOST || "localhost",
        port: process.env.DEV_DB_PORT || 27017,
        userName: process.env.DEV_DB_USERNAME || "root",
        password: process.env.DEV_DB_PASSWORD || "1411",
        name: process.env.DEV_DB_NAME || "cook_db",
        uri: "mongodb://127.0.0.1:27017/cook_db"
    },
};

const prod = {
    app: {
        host: process.env.PROD_HOST || "localhost",
        port: process.env.PROD_PORT || 3056,
    },
    db: {
        host: process.env.PROD_DB_HOST || "localhost",
        port: process.env.PROD_DB_PORT || 27017,
        userName: process.env.PROD_DB_USERNAME || "root",
        password: process.env.PROD_DB_PASSWORD || "1411",
        name: process.env.PROD_DB_NAME || "pro",
    },
};

const config: any = { dev, prod };

const env = process.env.NODE_ENV || "dev";

console.log("Current environment: ", config[env]);

export default config[env];
