import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const CreateJWT = () => {
  const payload = { name: "Lan", address: "Bac Giang" };
  const key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key, { expiresIn: "1h" });
    console.log("Created Token:", token);
  } catch (error) {
    console.log("Error creating token:", error);
  }
  return token;
};

export const verifyToken = (token) => {
  const key = process.env.JWT_SECRET;
  try {
    const decoded = jwt.verify(token, key);
    console.log("Verified Token:", decoded);
    return decoded;
  } catch (err) {
    console.log("Error verifying token:", err);
    return null;
  }
};
