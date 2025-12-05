import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.router.js";
import studentRoutes from "./routes/student.router.js";
import adminRoutes from "./routes/admin.router.js";
import publicRoutes from "./routes/public.router.js";

const app = express();

app.use(cors({ origin: true, credentials: true }));
// Increase payload limits to allow base64 image uploads from the admin UI
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/student", studentRoutes);
app.use("/admin", adminRoutes);
app.use("/courses", publicRoutes);
app.get("/", (req, res) => {
    res.send("Code Master Server is running");
});
export default app;
