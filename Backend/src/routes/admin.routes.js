import express from "express"
import multer from "../lib/multer.js"
import { Addproperty, checkAdminAuth, deleteProperty, getAllUsers, getProperties, getPropertyById, login, logout, updateProperty, winnersList } from "../controllers/admin.controller.js";
import { protectAdminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login",login);
router.get("/checkAdminAuth",protectAdminRoute,checkAdminAuth)
router.get("/logout",logout);
router.post("/addnewproperty",protectAdminRoute,multer.fields([
    { name: 'propertyImage', maxCount: 1 }
  ]),Addproperty);
router.get("/getallproperties",getProperties);
router.get("/getproperty/:id",getPropertyById);
router.put("/updateproperty/:id",protectAdminRoute,multer.fields([
    { name: 'propertyImage', maxCount: 1 }
]),updateProperty);
router.delete("/deleteproperty/:id",protectAdminRoute,deleteProperty);
router.get("/getallusers",protectAdminRoute,getAllUsers);
router.get("/winners",protectAdminRoute,winnersList);

export default router;