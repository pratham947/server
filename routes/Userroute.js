import express from "express";
import {
  loggedUser,
  userAuthentication,
} from "../controllers/Auth/userAuth.js";
import {
  deleteAccount,
  getUser,
  updateUser,
} from "../controllers/User/User.js";

const router = express.Router();

// Authenication
router.post("/authenticate", userAuthentication);
router.post("/logged", loggedUser);

// Crud user
router.post("/getUser", getUser);
router.post("/updateuser", updateUser);
router.delete("/deleteuser", deleteAccount);

export default router;
