import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
// Get the client
import db from "../models/index";
import dotenv from "dotenv";
dotenv.config();

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
        DT: "",
      };
    }
    let isPhoneExit = await checkExitPhone(userData.phone);
    if (isPhoneExit === true) {
      return {
        EM: "The phone is already exist!",
        EC: 1,
        DT: "",
      };
    }

    let hashPass = hashUserPassword(userData.password);

    await db.User.create({
      username: userData.username,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
      password: hashPass,
    });

    return {
      EM: "A user is created success...",
      EC: 0,
      DT: "",
    };
  } catch (error) {
    console.error(">>> error", error);
    return {
      EM: "Something wrongs in service...",
      EC: -2,
      DT: "",
    };
  }
};
const LoginUser = async (userData) => {
  try {
    let user = await getEmail(userData.email);
    //console.log(">>>> check user", user);
    if (user) {
      let check = bcrypt.compareSync(userData.password, user.password);
      if (!check) {
        return {
          EM: "Wrong password entered!",
          EC: 1,
          DT: "",
        };
      }
      const payload = {
        email: user.email,
        role: user.permission,
        id: user.id,
      };
      // eslint-disable-next-line no-undef
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return {
        EM: "Đăng nhập thành công",
        EC: 0,
        DT: {
          access_token: token,
          user: {
            email: user.email,
            role: user.permission,
          },
        },
      };
    }
    return {
      EM: "Tài khoản không tồn tại",
      EC: 1,
      DT: "",
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs in service...",
      EC: -2,
      DT: "",
    };
  }
};

// eslint-disable-next-line no-undef
module.exports = {
  RegisterNewuser,
  LoginUser,
};
