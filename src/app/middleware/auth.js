import jwt from "jsonwebtoken";
import config from "../config/config.js";
import User from "../model/user.model.js";

export const auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        // verify token first
        const payload = jwt.verify(token, config.access_token_secret);

        // fetch fresh user from DB to get up-to-date role and info
        const user = await User.findById(payload.id).select('_id role name email');
        if (!user) return res.status(401).json({ error: 'Unauthorized' });

        req.user = { id: user._id.toString(), role: user.role, name: user.name, email: user.email };
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
};
