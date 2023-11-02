import jwt from "jsonwebtoken";
import Admin from "../models/AdminAuth";

export const checkAdmin = async (req, res,next) => {
  const { token } = req.body;
  if (!token) return;
  const { Id } = jwt.verify(token, process.env.ADMIN_SECRET);
  const admin = await Admin.findById(Id);
  if(admin){
    next();
  }
};
