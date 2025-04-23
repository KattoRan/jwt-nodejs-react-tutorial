import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const CreateJWT = (user) => {
  // Kiểm tra xem user có tồn tại không
  if (!user || !user.id || !user.email) {
    console.log("User không hợp lệ", user);
    return null; // Trả về null nếu không có user hợp lệ
  }
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role || "Admin", // nếu có phân quyền
  };
  // eslint-disable-next-line no-undef
  const key = process.env.JWT_SECRET;

  try {
    const token = jwt.sign(payload, key, { expiresIn: "1h" });
    return token;
  } catch (error) {
    console.log("Lỗi khi tạo token:", error);
    return null;
  }
};
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  //console.log(">>>>Token:", token);
  if (!token) {
    return res.status(401).json({ EC: 1, EM: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ EC: 1, EM: "Invalid token" });
    }

    req.user = decoded; // bạn có thể truy cập thông tin người dùng sau này
    next();
  });
};

export default verifyToken;
