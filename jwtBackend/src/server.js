import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config(); // Khai bao thu vien dotenv moi lay dc cac bien trong file .env
import bodyParser from "body-parser";
import connection from "./config/connectDB";
import configCors from "./config/cors";
import initApiRoutes from "./routes/api";
const app = express();

const PORT = process.env.PORT || 8080;

configCors(app);
//config view engine
configViewEngine(app);

//test connection DB
connection();

//test jwt

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// init web routes
initWebRoutes(app);
initApiRoutes(app);

app.listen(PORT, () => {
  console.log(">>> JWT Backend is running on the port = " + PORT);
});
