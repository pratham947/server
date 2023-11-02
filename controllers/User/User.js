import User from "../../models/UserAuth.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const { token } = req.body;
  console.log("called");
  const verify = jwt.verify(token, process.env.JWT_SECRET);
  console.log(verify);
};

export const updateUser = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).send("please send the token");
  const user = await getUserFromToken(token);
  console.log(user);
  const updateUser = await User.findByIdAndUpdate(user._id, req.body, {
    new: true,
  });
  res.status(201).json({
    message: "User upated Successfully",
    updateUser,
  });
};

export const deleteAccount = async (req, res) => {
  const { token } = req.body;
  const user = getUserFromToken(token);
  await User.findOneAndDelete({ id: user._id });
  res.status(201).send("user deleted successfully");
};
