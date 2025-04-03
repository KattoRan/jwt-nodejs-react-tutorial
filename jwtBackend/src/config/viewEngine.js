import express from "express";

/**
 * express app
 */
const configViewEngine = (app) => {
    app.use(express.static('./src/public'));
    app.set("view engine", "ejs"); // dung cong nghe ejs de viet html
    app.set("views", "./src/views"); // Cac file view luu tru tai folder view
}

export default configViewEngine;