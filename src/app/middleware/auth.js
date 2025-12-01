import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        req.user = jwt.verify(token, config.access_token_secret);
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
};
