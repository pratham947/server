import express from "express";
import { adminAuthentication } from "../controllers/Auth/adminAuth.js";
import { AddChild } from "../controllers/Admin/Adopation.js";

const router = express.Router();

// Authentication
router.post("/authenticate", adminAuthentication);

// adoption
router.post("/adoption", AddChild);

export default router;
