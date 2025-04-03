import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
// Get the client
import db from '../models/index'
import { Op } from "sequelize";

// Create the connection to database

const hashUserPassword = (userPassword) =>{
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewuser = async (email,password,username) => {
    let hashPass = hashUserPassword(password);
    try {

        await db.User.create({
            username : username,
            email : email,
            password : hashPass
        })
    } catch (err) {
        console.log(err);
    }
}
const getUserByUsername = async (username) => {
    try {

        let user = {};
        user = await db.User.findOne({
            where: { username: username }
        });
        return user = user.get({ plain: true });
        
    } catch (err) {
        console.error("Lỗi truy vấn:", err);
        return null;
    }
};
const getLoginuser = async(username, password) =>{
    try {
        let user = await getUserByUsername(username);
        if (!user) {
            return { success: false, message: "Tài khoản không tồn tại!"};
        }
        let check = bcrypt.compareSync(password, user.password);
        if (!check) {
            return { success: false, message: "Mật khẩu không đúng!"};
        }
        return { success: true, message: "Đăng nhập thành công!", user };
    } catch (error) {
        return { success: false, message: "Lỗi server!" };
    }
}
const getUserList = async () => {
    let users = [];
    users = await db.User.findAll();
    return users;
}
const deleteUser = async (id) => {
    try{
        await db.User.destroy({
            where: { id: id }
        })
    }
    catch (error) {
        console.error("Lỗi truy vấn:", err);
        return null;
    }
}
const getUserByID = async (id) => {
    try {

        let user = {};
        user =  await db.User.findOne({
            where: {id : id}
        });
        return user = user.get({plain:true});
        
    } catch (err) {
        console.error("Lỗi truy vấn:", err);
        return null;
    }
};
const searchUser = async(username) =>{
    try {
        let user = [];
        user = await db.User.findAll({
            where: {
                username: {
                    [Op.like]: `%${username}%`,
                },
            },
        });
        return user;
    } catch (err) {
        console.error("Lỗi truy vấn:", err);
        return null;
    }
}
const updateUserInfo = async (email,username,id) => {
    try
    {
        await db.User.update(
            { email : email, username : username },
            {
                where: {id : id}
            }
        )
    }
    catch (error)
    {
        console.error("Lỗi truy vấn:", err);
        return null;
    }
}
module.exports = {
    createNewuser, getLoginuser, getUserList, deleteUser, getUserByID, updateUserInfo, searchUser
}