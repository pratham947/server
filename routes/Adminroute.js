import express from "express"
import { adminAuthentication } from "../controllers/Auth/adminAuth.js";

const router = express.Router();

router.post("/authenticate",adminAuthentication);


export default router;