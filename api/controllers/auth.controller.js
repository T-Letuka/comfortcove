import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { handleError } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password || username === " " || email === " ") {
    next(handleError(400, "All fields are required"));
  }
  const hashedPassword = bcryptjs.hashSync(password, 8);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.json({ message: "Successful Signup" });
  } catch (error) {
    next(error);
  }
};
