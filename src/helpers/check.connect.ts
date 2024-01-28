import mongoose from "mongoose";
import os from "os";
import process from "process";

const _SECONDS = 5000;

export const countConnect = () => {
    const countConnection = mongoose.connect.length;
    console.log(`Current numbre of connections: ${countConnection}`);
};

export const checkOverload = () => {
    setInterval(() => {
        const countConnection = mongoose.connect.length;
        const numCPUCores = os.cpus().length;
        const memoryUsed = process.memoryUsage().rss;

        console.log(`Current number of connections: ${countConnection}`);
        console.log(`Number of CPU cores: ${numCPUCores}`);
        console.log(`Memory used: ${memoryUsed / 1024 / 1024} MB`);

        if (countConnection > 10) {
            console.log("Connection overload!!!");
        }
    }, _SECONDS);
};
