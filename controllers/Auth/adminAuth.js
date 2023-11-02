import { v4 as uuidv4 } from "uuid";
import Authenicate from "../../schemas/AdminAuth.js";
import Admin from "../../models/AdminAuth.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";

export const generateToken = (admin) =>{
    const token = jwt.sign({Id : admin._id},process.env.ADMIN_SECRET);
    return token
}

function strongPassword(password) {
  let strength = 0;
  if (password.match(/[a-z]+/)) {
    strength += 1;
  }
  if (password.match(/[A-Z]+/)) {
    strength += 1;
  }
  if (password.match(/[0-9]+/)) {
    strength += 1;
  }
  if (password.match(/[$@#&!]+/)) {
    strength += 1;
  }

  return strength == 4 ? true : false;
}

export const adminAuthentication = async (req, res) => {
  const body = req.body;
  const validation = Authenicate.safeParse(body);
  if (!validation.success) return res.status(400).send(validation.error.errors);
  const adminCount = await Admin.find();
  const { limit } = req.body;
  if (adminCount <= limit) {
    const strength = strongPassword(req.body.password);
    if (!strength)
      return res.status(401).send({
        message:
          "Your password should contain character from A to Z , a to z, 1 to 9,",
      });
    const { password } = req.body;
    let login_id = uuidv4();
    login_id = await bcrypt.hash(login_id, 10);
    const newAdmin = await Admin({ password, login_id });
    newAdmin.save();
    res.status(201).send({
      message: "account created successfully",
      newAdmin,
      login_id,
    });
  } else {
    res.status(201).json({
      messsage: "the account creation limit is overflow",
    });
  }
};

export const AdminLogin = async (req, res) => {
  const { password, login_id } = req.body;
  const admin = await Admin.findOne(password);
  if (!admin)
    return res.status(401).json({
      message: "admin not found",
    });
  const compareLoginId = bcrypt.compare(login_id);
  if (!compareLoginId)
    return res.status(401).json({
      message: "admin not found",
    });
    res.status(201).json({
        message : "admin created successfully",
    })
};
