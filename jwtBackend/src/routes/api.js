import express from "express";
import apiController from "../controller/authController";
import userController from "../controller/userController";
import verifyToken from "../middleware/JWTAction";

const router = express.Router();

const initApiRoutes = (app) => {
  // Auth
  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);

  // User (cần xác thực)
  router.get("/user-manager", verifyToken, userController.readFunc);
  router.get("/user-manager/:id", verifyToken, userController.getUserFunc);
  router.put("/user-manager/:id", verifyToken, userController.updateFunc);
  router.delete("/user-manager/:id", verifyToken, userController.deleteFunc);

  return app.use("/api", router);
};

export default initApiRoutes;
