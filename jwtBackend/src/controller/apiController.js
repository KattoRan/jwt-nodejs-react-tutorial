import loginRegisterService from "../service/loginRegisterService";
const handleRegister = async (req, res) => {
  try {
    // req.body: email, phone, username, password
    let { email, phone, username, password } = req.body;
    if (!email || !phone || !password) {
      return res.status(200).json({
        EM: "Missing required parameters",
        EC: "1",
        DT: "",
      });
    }
    //service: create user
    let data = await loginRegisterService.RegisterNewuser(req.body);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: "",
    });
  } catch (error) {
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};
const handleLogin = async (req, res) => {
  try {
    // req.body: email, phone, username, password
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(200).json({
        EM: "Missing required parameters",
        EC: "1",
        DT: "",
      });
    }
    //service: login user
    let data = await loginRegisterService.LoginUser(req.body);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: "",
    });
  } catch (error) {
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};
module.exports = {
  handleRegister,
  handleLogin,
};
