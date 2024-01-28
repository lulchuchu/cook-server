import mongoose from "mongoose";
import { countConnect } from "../helpers/check.connect";
import config from "../configs/config";

const MONGO_URI = `mongodb://${config.db.userName}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}`;

class Database {
    static instance: any;
    constructor() {
        this.connect();
    }

    connect() {
        mongoose
            .connect(MONGO_URI)
            .then(() => {
                console.log("Connected to MongoDB at ", MONGO_URI);
                console.log("Database name: ", config.db.name);
                console.log("Current number of connections: ", countConnect());
            })
            .catch((err) => {
                console.log("Error connecting to MongoDB at ", MONGO_URI, err);
            });
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

const db = Database.getInstance();
export default db;
