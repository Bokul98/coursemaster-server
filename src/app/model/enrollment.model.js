import { Schema, model } from "mongoose";

const EnrollmentSchema = new Schema({
  userId: { type: String, required: true },
  courseId: { type: String, required: true },
  batchId: { type: String, default: null },
  progress: { type: Number, default: 0 },
  lessonsCompleted: { type: [String], default: [] }
}, { timestamps: true });

export default model("Enrollment", EnrollmentSchema);
