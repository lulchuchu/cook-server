import mongoose from "mongoose";
// import { countConnect } from "../helpers/check.connect";
import config from "../configs/config";

const MONGO_URI = config.db.uri;

class Database {
    static instance: any;
    constructor() {
        this.connect();
    }

    async connect() {
        try {
            console.log('Connecting to MongoDB...');
            await mongoose.connect("mongodb://127.0.0.1:27017/cook_db");
    
            console.log("Successfully connected!");
        }
        catch(err: any) {
            console.error('Error connecting to MongoDB:', err.message);
        }
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
