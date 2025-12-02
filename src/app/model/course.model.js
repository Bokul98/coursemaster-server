import { Schema, model } from "mongoose";

const CourseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: Number, default: 0 },
  instructor: { type: String, default: '' },
  syllabus: { type: [String], default: [] },
  metadata: { type: Object, default: {} }
}, { timestamps: true });

export default model("Course", CourseSchema);
