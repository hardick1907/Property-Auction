import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  email: { type: String, required: true },
  message: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
