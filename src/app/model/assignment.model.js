import { Schema, model } from "mongoose";

const AssignmentSchema = new Schema({
  userId: { type: String, required: true },
  courseId: { type: String, required: true },
  moduleId: { type: String, default: null },
  lessonId: { type: String, default: null },
  content: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});

export default model("Assignment", AssignmentSchema);
