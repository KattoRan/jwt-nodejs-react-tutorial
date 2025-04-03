// khai bao cac route vaf duong link url ma ta sd duoc
import express from "express";
import apiController from "../controller/apiController";

const router = express.Router();

const initApiRoutes = (app) => {
  //path, handler

  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);

  return app.use("/api/", router); // khai bao duong link, "/" duong link of trang home
  // app.use khai bao tham so dau tien cua trang vd "/abc" thi .../abc/about
};

export default initApiRoutes;
