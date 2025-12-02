import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.router.js";
import studentRoutes from "./routes/student.router.js";
import adminRoutes from "./routes/admin.router.js";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/student", studentRoutes);
app.use("/admin", adminRoutes);
app.get("/", (req, res) => {
    res.send("Code Master Server is running");
});
export default app;
