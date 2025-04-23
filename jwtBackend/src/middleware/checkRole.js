import dotenv from "dotenv";
dotenv.config();
const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ EC: 1, EM: "You are not authorized" });
    }
    next();
  };
};

export default checkRole;
