import express from "express"
import { Addproperty, checkAdminAuth, deleteProperty, getAllUsers, getProperties, getPropertyById, login, logout, updateProperty, winnersList } from "../controllers/admin.controller.js";
import { protectAdminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login",login);
router.get("/checkAdminAuth",protectAdminRoute,checkAdminAuth)
router.get("/logout",logout);
router.post("/addnewproperty", protectAdminRoute, Addproperty);
router.get("/getallproperties",getProperties);
router.get("/getproperty/:id",getPropertyById);
router.put("/updateproperty/:id",protectAdminRoute,updateProperty);
router.delete("/deleteproperty/:id",protectAdminRoute,deleteProperty);
router.get("/getallusers",protectAdminRoute,getAllUsers);
router.get("/winners",protectAdminRoute,winnersList);

export default router;