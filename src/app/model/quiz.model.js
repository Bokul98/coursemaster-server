import { Schema, model } from "mongoose";

const QuizSchema = new Schema({
  userId: { type: String, required: true },
  courseId: { type: String, required: true },
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  submittedAt: { type: Date, default: Date.now }
});

export default model("Quiz", QuizSchema);
