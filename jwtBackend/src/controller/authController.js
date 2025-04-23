import loginRegisterService from "../service/loginRegisterService";
const handleRegister = async (req, res) => {
  try {
    // req.body: email, phone, username, password
    let { email, phone, password } = req.body;
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
    console.log(error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};
const handleLogin = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(200).json({
        EM: "Missing required parameters",
        EC: 1,
        DT: "",
      });
    }

    // Gọi service: LoginUser
    let data = await loginRegisterService.LoginUser(req.body);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT, // Trả lại token và user nếu thành công
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

// eslint-disable-next-line no-undef
module.exports = {
  handleRegister,
  handleLogin,
};
