// khai bao cac route vaf duong link url ma ta sd duoc
import express from "express";
import homeController from '../controller/homeController'
const router = express.Router();

const initWebRoutes = (app) => {
    //path, handler
    router.get("/", homeController.handleHelloWorld)
    router.get("/user", homeController.handleUserPage)
    router.get("/login", homeController.handleLogin)
    router.get("/register", homeController.handleRegister)
    
    router.post("/register", homeController.handleCreateNewuser)
    router.post("/login", homeController.handleLoginUser)
    router.post("/user/delete-user/:id", homeController.handleDeleteUser)
    router.get("/user/edit-user/:id", homeController.getEditUser)
    router.post("/user/edit-user", homeController.handleUpdateUser)
    router.post("/user", homeController.handleCreateNewuser)
    //router.get("/user", homeController.handleSearchUser)
    return app.use("/", router); // khai bao duong link, "/" duong link of trang home
    // app.use khai bao tham so dau tien cua trang vd "/abc" thi .../abc/about
}

export default initWebRoutes;