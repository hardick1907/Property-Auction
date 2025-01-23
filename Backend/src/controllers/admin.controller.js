import Admin from "../models/admin.model.js";
import bcrypt from "bcrypt";
import {generateToken} from "../lib/util.js";
import Property from "../models/property.model.js";
import User from "../models/user.model.js";

export const login = async (req, res) => {
    const { email, password,adminID } = req.body;
    console.log("Email:", email, "Password:", password,"Admin ID:",adminID);
  
    try {
      const admin = await Admin.findOne({ email,adminID });
  
      if (!admin) {
        return res.status(404).json({ message: "Invalid credentials" });
      }
  
      const isPasswordMatch = await bcrypt.compare(password, admin.password);
  
      if (!isPasswordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      generateToken(admin._id, res);
  
      res.status(200).json({ message: "Login successful" });
  
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json("Internal Server Error");
    }
};

export const logout = (req, res) => {
    try {
      res.cookie("jwt", "", { maxAge: 0 });
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.log("Error in logout controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
};

export const checkAdminAuth = (req, res) => {
    try {
      res.status(200).json(req.user);
    } catch (error) {
      console.log("Error in checkAuth controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
};

export const Addproperty = async (req, res) => {
  const {
    title,
    category,
    institute,
    address,
    city,
    state,
    pincode,
    area,
    reservedPrice,
    propertyPrice,
    emdAmount,
    startingBidAmount,
    minimunBidAmount,
    startDate,
    endDate,
    auctionBrief,
  } = req.body;

  try {

    if(!title || !category || !institute || !address || !city || !state || !pincode || !area || !reservedPrice || !propertyPrice || !emdAmount || !startingBidAmount || !minimunBidAmount || !startDate || !endDate || !auctionBrief) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const property = new Property({
      title,
      category,
      institute,
      address,
      city,
      state,
      pincode,
      area,
      reservedPrice,
      propertyPrice,
      emdAmount,
      startingBidAmount,
      minimunBidAmount,
      startDate,
      endDate,
      auctionBrief,
      propertyImage: req.files['propertyImage'] ? req.files['propertyImage'][0].path : null
    });

    await property.save();
    res.status(200).json({ message: "Property added successfully" });

  } catch (error) {
    console.error("Error adding property:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    console.error("Error fetching property by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const updateProperty = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.files && req.files.propertyImage) {
      updateData.propertyImage = req.files.propertyImage[0].path;
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(updatedProperty);
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const deleteProperty = async (req, res) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);
    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export const winnersList = async (req, res) => {
    try {
        // Find all properties with a highest bidder, sorted by end date
        const winners = await Property.find({ 
            'highestBidder.id': { $exists: true },
            status: 'Booked'
        })
        .sort({ endDate: -1 })
        .populate('highestBidder.id', 'name email mobilenumber photographDocument');

        res.status(200).json(winners);
    } catch (error) {
        console.error("Error fetching winners:", error);
        res.status(500).json({ 
            message: "Error retrieving winners", 
            error: error.message 
        });
    }
};