// Get the client
import db from "../models/index";

const getAllUsers = async () => {
  try {
    let users = await db.User.findAll();
    //console.log(">>>>>> check user:", users);
    if (users) {
      //let data = users.get({ plain: true });
      return {
        EM: "",
        EC: 0,
        DT: users,
      };
    } else {
      return {
        EM: "",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const createNewUser = () => {};

const getUser = async (id) => {
  try {
    let user = {};
    user = await db.User.findOne({
      where: { id: id },
    });
    if (user) user = user.get({ plain: true });
    return user;
  } catch (error) {
    console.error("Lỗi truy vấn:", error);
  }
};

const updateUser = async (id, data) => {
  try {
    await db.User.update(
      { phone: data.phone, address: data.address, permission: data.permission },
      {
        where: { id: id },
      }
    );
  } catch (error) {
    console.error("Lỗi truy vấn:", error);
  }
};

const deleteUser = async (id) => {
  try {
    await db.User.destroy({
      where: { id: id },
    });
  } catch (error) {
    console.log(error);
  }
};

// eslint-disable-next-line no-undef
module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
  getUser,
};
