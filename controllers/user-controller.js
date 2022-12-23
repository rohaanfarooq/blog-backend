import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    return console.log(error);
  }
  if (!users) {
    return res.status(404).json({ message: "No users found" });
  }
  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (existingUser) {
    return res.status(400).json({ message: "User Already Exists" });
  }

  const hashedPassword = bcrypt.hashSync(password);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    blogs: [],
  });

  try {
    await newUser.save();
  } catch (error) {
    return console.log(error);
  }
  return res.status(201).json({ newUser });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User does not exist" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }
  return res
    .status(201)
    .json({ message: "Login Successful", user: existingUser });
};
