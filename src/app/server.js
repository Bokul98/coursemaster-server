import mongoose from "mongoose";
import app from "./app.js";
import config from "./config/config.js";

mongoose
    .connect(config.db_uri)
    .then(() => {
        console.log("MongoDB Connected");
        app.listen(config.port, () => {
            console.log(`Code Master Server running on port http://localhost:${config.port}`);
        });
    })
    .catch((err) => console.log("DB Error:", err));
