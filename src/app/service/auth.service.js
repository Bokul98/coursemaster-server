import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ms from "ms";
import User from "../model/user.model.js";
import RefreshToken from "../model/refreshToken.model.js";
import config from "../config/config.js";

export const signup = async (data) => {
    const exists = await User.findOne({ email: data.email });
    if (exists) throw new Error("Email already exists");

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await User.create({
        ...data,
        password: hashedPassword,
    });

    return { message: "Signup successful" };
};

export const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        config.access_token_secret,
        { expiresIn: config.access_token_expires_in }
    );
};

export const generateRefreshToken = async (user) => {
    const token = jwt.sign(
        { id: user._id },
        config.refresh_token_secret,
        { expiresIn: config.refresh_token_expires_in }
    );

    await RefreshToken.deleteMany({ userId: user._id });

    await RefreshToken.create({
        userId: user._id,
        token,
        expiresAt: new Date(Date.now() + ms(config.refresh_token_expires_in))
    });

    return token;
};

export const signin = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) throw new Error("Wrong email or password");

    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accessToken,
        refreshToken,
    };
};
