import { Schema, model } from "mongoose";

const BatchSchema = new Schema({
  courseId: { type: String, required: true },
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  metadata: { type: Object, default: {} }
}, { timestamps: true });

export default model("Batch", BatchSchema);
