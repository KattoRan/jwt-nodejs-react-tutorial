const cors = require("cors");

const configCors = (app) => {
  const corsOptions = {
    origin: "http://localhost:3000", // Chỉ cho phép React frontend gọi API
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  };

  app.use(cors(corsOptions));
};

module.exports = configCors;
