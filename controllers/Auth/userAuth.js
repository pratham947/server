import User from "../../models/UserAuth.js";
import Authenticate from "../../schemas/UserAuth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (newUser) => {
  return jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
};

export const userAuthentication = async (req, res) => {
  const body = req.body;
  const validation = Authenticate.safeParse(body);
  if (!validation.success) return res.status(400).send(validation.error.errors);

  //   check user already exist in the database
  let user = await User.findOne({ email: body.email });

  // if user already exist then return
  if (user) return res.status(401).json({ message: "user already exist" });

  let { firstName, lastName, email, password } = req.body;

  // hasing the password
  password = await bcrypt.hash(password, 10);
  user = { firstName, lastName, email, password };

  //   saving user in to the database
  const newUser = await User(user).save();

  // generating a token
  const token = generateToken(newUser);
  res.status(201).json({ token });
};

export const loggedUser = async (req,res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword)
      return res.status(201).json({ token: generateToken(user) });
    else return res.status(400).send("email or passord is wrong");
  }
  res.status(400).send("email or passord is wrong");
};


