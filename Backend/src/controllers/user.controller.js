import { transporter } from "../lib/nodemailer.js";
import OTP from "../models/otp.model.js";
import User from "../models/user.model.js";
import Property from "../models/property.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/util.js";
import { io } from "../lib/socket.js";
import Feedback from "../models/review.model.js";
import cloudinary from "../lib/cloudinary.js";

export const sendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const saltRounds = 10;
    const hashedOTP = await bcrypt.hash(otp, saltRounds);

    await OTP.findOneAndUpdate(
      { email },
      { otp: hashedOTP },
      { upsert: true, new: true }
    );

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "OTP Verification",
      text: 
      `Thank you for registering with AuctionBase.

      Your OTP for verification is: ${otp}

      Please do not share this OTP with anyone.

      Best regards,
      AuctionBase Team`,
    });

    return res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ message: "Failed to send OTP" });
  }
};

export const verifyOTP = async (req, res) => {
  const { otpCode, email } = req.body;
  console.log("OTP:", otpCode, "Email:", email);

  try {
    const record = await OTP.findOne({ email });

    if (!record) {
      return res.status(404).json({ message: "OTP not found or expired" });
    }

    const isOTPMatch = await bcrypt.compare(otpCode, record.otp);
    
    if (!isOTPMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // If OTP matches, delete the record and return success
    await OTP.deleteOne({ email });
    return res.status(200).json({ message: "OTP verified successfully" });
    
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ "Internal Server Error": error.message });
  }
};

// ... previous imports remain the same

export const registerUser = async (req, res) => {
  try {
    const {
      name, email, password, mobilenumber, aadharnumber,
      applicantfathername, applicantrelation, pannumber,
      address, city, state, pincode, dob, sex, maritalStatus,acceptConditions
    } = req.body;

    // Log the files received
    console.log("Files received:", req.files);

    // Check if all required files are present
    if (!req.files || !req.files.photographDocument) {
      return res.status(400).json({ 
        message: "All required documents must be uploaded.",
        receivedFiles: req.files ? Object.keys(req.files) : []
      });
    }


    // Upload photograph
    const photographUpload = await cloudinary.uploader.upload(req.files.photographDocument.tempFilePath, {
      folder: "photographs"
    });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      mobilenumber,
      aadharnumber,
      applicantfathername,
      applicantrelation,
      pannumber,
      address,
      city,
      state,
      pincode,
      dob,
      sex,
      maritalStatus,
      photographDocument: photographUpload.secure_url,
      acceptConditions
    });

    await newUser.save();

    // Generate JWT token
    generateToken(newUser._id, res);

    // Return success response
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      photographDocument: newUser.photographDocument
    });

  } catch (error) {
    console.error("Error in register controller:", error);
    res.status(500).json({ 
      message: "Registration failed", 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({ message: "Login successful" });

  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json("Internal Server Error");
  }
}

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const placeBid = async (req, res) => {
    const { id } = req.params;
    const { bidAmount } = req.body;
  
    try {
      const property = await Property.findById(id);
  
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
  
      // Convert string values to numbers
      const currentBidAmount = parseFloat(property.currentBidAmount);
      const minimumBidAmount = parseFloat(property.minimunBidAmount);
      const startingBidAmount = parseFloat(property.startingBidAmount);
  
      if (isNaN(currentBidAmount) || isNaN(minimumBidAmount)) {
        return res.status(400).json({ message: 'Invalid current bid or minimum bid amount in database' });
      }
  
      // Check if this is the first bid or a subsequent one
      if (currentBidAmount === 0) {
        // First bid, should be greater than the starting bid
        if (bidAmount < property.startingBidAmount) {
          return res.status(400).json({ message: `Bid amount must be greater than the starting bid of 
            ₹ ${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(startingBidAmount)}` });
        }
      } else {
        // Subsequent bids, should be at least currentBid + minimum bidding amount
        const minimumBidAmountForNextBid = currentBidAmount + minimumBidAmount;
        if (bidAmount < minimumBidAmountForNextBid) {
          return res.status(400).json({
            message: `Bid amount must be at more than
            ₹${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(minimumBidAmountForNextBid)} (current bid + minimum bidding increment)`
          });
        }
      }
  
      // Create bid history entry
      const bidHistoryEntry = {
        bidder: {
          id: req.user._id,
          email: req.user.email,
          name: req.user.name,
          photographDocument: req.user.photographDocument,
        },
        bidAmount,
        timestamp: new Date()
      };
  
      // Update property with bid history
      property.currentBidAmount = bidAmount;
      property.highestBidder = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
      };
      property.biddingHistory.push(bidHistoryEntry);
      await property.save();
  
      // Emit bid event via socket.io
      io.emit('bidPlaced', bidHistoryEntry);
      io.emit('currentBid', property.currentBidAmount);
  
      return res.status(200).json({
        message: 'Bid placed successfully',
        bidHistory: bidHistoryEntry
      });
    } catch (error) {
      console.error('Error in placeBid controller:', error.message);
      return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getBidHistory = async (req, res) => {
    const { id } = req.params;
  
    try {
      const property = await Property.findById(id);
  
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
  
      return res.status(200).json(property.biddingHistory);
    } catch (error) {
      console.error('Error in getBidHistory controller:', error.message);
      return res.status(500).json({ message: 'Internal server error' });
      }
}

export const getMyBids = async (req, res) => {
  try {
    const bids = await Property.find({
      'biddingHistory.bidder.id': req.user._id
    }).select('title currentBidAmount biddingHistory propertyImage');
    
    const formattedBids = bids.map(property => ({
      _id: property._id,
      propertyName: property.title,
      currentBid: property.currentBidAmount,
      propertyImage: property.propertyImage,
      biddingHistory: property.biddingHistory
    }));

    return res.status(200).json(formattedBids);
  } catch (error) {
    console.error('Error fetching my bids:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const postReview = async (req, res) => {
    const {email,name,message} = req.body;
    try {
      const newReview = new Feedback({email,name,message});
      await newReview.save();
      return res.status(201).json(newReview);
    } catch (error) {
      console.error('Error in postReview controller:', error.message);
      return res.status(500).json({ message: 'Internal server error' });
    }
}

export const getReviews = async (req, res) => {
    try {
      const reviews = await Feedback.find();
      return res.status(200).json(reviews);
    } catch (error) {
      console.error('Error in getReviews controller:', error.message);
      return res.status(500).json({ message: 'Internal server error' });
    }
}