// khai bao cac route vaf duong link url ma ta sd duoc
import express from "express";
import apiController from "../controller/apiController";
import userController from "../controller/userController";
const router = express.Router();

const initApiRoutes = (app) => {
  //path, handler

  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);

  router.get("/user-manager", userController.readFunc);
  router.delete("/user-manager/:id", userController.deleteFunc);
  router.get("/user-manager/:id", userController.getUserFunc);
  router.put("/user-manager/:id", userController.updateFunc);

  return app.use("/api/", router); // khai bao duong link, "/" duong link of trang home
  // app.use khai bao tham so dau tien cua trang vd "/abc" thi .../abc/about
};

export default initApiRoutes;
