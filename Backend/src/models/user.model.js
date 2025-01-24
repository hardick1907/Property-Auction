import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobilenumber: { type: String, required: true },
  aadharnumber: { type: String, required: true, unique: true },
  applicantfathername: { type: String, required: true },
  applicantrelation: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  dob: { type: Date, required: true },
  sex: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  photographDocument: { type: String, required: true },
  acceptConditions: { type: Boolean, required: true },
  role: { type: String, enum: ["customer", "admin"], default: "customer" },
  pannumber: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

export default User;
