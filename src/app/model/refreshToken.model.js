import { Schema, model } from "mongoose";

const RefreshTokenSchema = new Schema({
    userId: { type: String, required: true },
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true }
});

export default model("RefreshToken", RefreshTokenSchema);
