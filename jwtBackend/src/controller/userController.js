import userApiService from "../service/userApiService";
const readFunc = async (req, res) => {
  try {
    const data = await userApiService.getAllUsers();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
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
const getUserFunc = async (req, res) => {
  try {
    const id = req.params.id;
    //console.log("Deleting user with ID:", id); // Log ID để kiểm tra
    const user = await userApiService.getUser(id);
    return res.status(200).json({
      EM: "Lay user thanh cong",
      EC: 0,
      DT: user,
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
const updateFunc = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await userApiService.updateUser(id, data);
    return res.status(200).json({
      EM: "Cập nhật thành công",
      EC: 0,
      DT: result,
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

const deleteFunc = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Deleting user with ID:", id); // Log ID để kiểm tra
    await userApiService.deleteUser(id);
    return res.status(200).json({
      EM: "Xoá thành công",
      EC: 0,
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

// eslint-disable-next-line no-undef
module.exports = {
  readFunc,
  updateFunc,
  deleteFunc,
  getUserFunc,
};
