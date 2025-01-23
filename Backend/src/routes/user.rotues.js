import express from "express";
import multer from "../lib/multer.js";
import { checkAuth, getBidHistory, login, logout, placeBid, registerUser, sendOTP, verifyOTP,getMyBids, postReview, getReviews } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/send-otp",sendOTP);
router.post("/verify-otp",verifyOTP);
router.post('/register', multer.fields([
    { name: 'identityDocument', maxCount: 1 },
    { name: 'pancardDocument', maxCount: 1 },
    { name: 'photographDocument', maxCount: 1 }
  ]),registerUser );
router.post("/login", login);
router.get("/checkAuth",protectRoute,checkAuth);
router.get("/logout",logout);
router.post("/placebid/:id",protectRoute,placeBid);
router.get("/property/:id/bidhistory",getBidHistory);
router.get("/mybiddings",protectRoute,getMyBids);
router.post("/postreview",postReview);
router.get("/allreviews",getReviews);

export default router;