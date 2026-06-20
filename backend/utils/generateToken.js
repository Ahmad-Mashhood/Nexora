import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || "dev_secret_change_me",
    { expiresIn: "30d" }
  );
};

export default generateToken;
