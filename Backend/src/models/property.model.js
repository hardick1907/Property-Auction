import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    institute: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    area: { type: String, required: true },
    reservedPrice: { type: String, required: true },
    propertyPrice: { type: String, required: true },
    emdAmount: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    endTime: { type: String, required: true, default: "23:59" },
    auctionBrief: { type: String, required: true },
    propertyImage: { type: String },
    status: { type: String, enum: ["Booked", "Vacant"], default: "Vacant" },
    startingBidAmount: { type: String, required: true },
    minimunBidAmount: { type: String, required: true },
    currentBidAmount: { type: String,default: "0" },
    notified: { type: Boolean, default: false },
    highestBidder: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: { type: String },
      email: { type: String },
      mobilenumber: { type: String },
      photographDocument: { type: String },
    },
    biddingHistory: [
      {
        bidder: {
          id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
          name: { type: String, required: true },
          email: { type: String, required: true },
          photographDocument: { type: String },
        },
        bidAmount: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model("Property", propertySchema);

export default Property;


