import asyncHandler from "../utils/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import User from "../models/User.js";

const ALLOWED_REGISTER_ROLES = ["buyer", "seller"];

// @desc    Register new user (buyer or seller)
// @route   POST /api/auth/register
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role = "buyer", storeName } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const safeRole = ALLOWED_REGISTER_ROLES.includes(role) ? role : "buyer";

  const user = await User.create({
    name,
    email,
    password,
    role: safeRole,
    storeName: safeRole === "seller" ? storeName || `${name}'s Store` : "",
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    storeName: user.storeName,
    token: generateToken(user._id),
  });
});

// @desc    Login user
// @route   POST /api/auth/login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      storeName: user.storeName,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Get current user profile
// @route   GET /api/auth/me
export const getMe = asyncHandler(async (req, res) => {
  res.json(req.user);
});
