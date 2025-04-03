import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
// Get the client
import db from "../models/index";

const checkExitEmail = async (userEmail) => {
  let isExitEmail = await db.User.findOne({
    where: { email: userEmail },
  });
  return !!isExitEmail;
};
const getEmail = async (userEmail) => {
  let user = await db.User.findOne({
    where: { email: userEmail },
  });
  if (user) user = user.get({ plain: true });
  else user = null;
  return user;
};
const checkExitPhone = async (userPhone) => {
  let isExitPhone = await db.User.findOne({
    where: { phone: userPhone },
  });
  return !!isExitPhone;
};
const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};
const RegisterNewuser = async (userData) => {
  try {
    let isEmailExit = await checkExitEmail(userData.email);
    console.log(" >> check:", isEmailExit);
    if (isEmailExit === true) {
      return {
        EM: "The email is already exist!",
        EC: 1,
      };
    }
    let isPhoneExit = await checkExitPhone(userData.phone);
    if (isPhoneExit === true) {
      return {
        EM: "The phone is already exist!",
        EC: 1,
      };
    }

    let hashPass = hashUserPassword(userData.password);

    await db.User.create({
      username: userData.username,
      email: userData.email,
      phone: userData.phone,
      password: hashPass,
    });

    return {
      EM: "A user is created success...",
      EC: 0,
    };
  } catch (error) {
    return {
      EM: "Something wrongs in service...",
      EC: -2,
    };
  }
};
const LoginUser = async (userData) => {
  try {
    let user = await getEmail(userData.email);
    console.log(">>>> check user", user);
    if (user) {
      let check = bcrypt.compareSync(userData.password, user.password);
      if (!check) {
        return {
          EM: "Wrong password entered!",
          EC: 1,
        };
      }
      return {
        EM: "Đăng nhập thành công",
        EC: 0,
      };
    }
    return {
      EM: "Tài khoản không tồn tại",
      EC: 1,
    };
  } catch (error) {
    return {
      EM: "Something wrongs in service...",
      EC: -2,
    };
  }
};

module.exports = {
  RegisterNewuser,
  LoginUser,
};
