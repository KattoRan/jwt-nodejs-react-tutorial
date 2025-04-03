import { cache } from 'ejs';
import userService from '../service/userService'
const handleHelloWorld = (req,res) => {
    const name = "Mel";
    return res.render("home.ejs", { name });
}

const handleUserPage = async (req,res) =>
{
    // model => get data from database giong bien name ben tren
    let user_search = req.query.search||"";
    let userList = await userService.searchUser(user_search);
    if (!userList) userList = [];
    //console.log("user: ",userList);
    return res.render("user.ejs", { userList, user_search});
}

const handleLogin = (req, res) => {
    const result = {success: true};
    const data = {result};
    return res.render("login.ejs", {data});
}

const handleRegister = (req, res) => {
    return res.render("register.ejs");
}

const handleCreateNewuser = async (req, res) => {
    try {
        const { email, username, password, confirmPassword } = req.body;
        await userService.createNewuser(email, password, username);
        let red = req.query.redirect;
        if (red === 'login' ) return res.redirect('/login');
        else return res.redirect('/user');
    } catch (error) {
        console.error('Lỗi đăng ký:', error);
        res.status(500).send('Lỗi đăng ký. Vui lòng thử lại.');
    }
};
const handleLoginUser = async (req,res) => {
    try {
        const { username, password } = req.body;
        const result = await userService.getLoginuser(username,password);
        const data = {result,username};
        if (!result.success) return res.render('login.ejs',{data});
        else return res.redirect('/user');
    }
    catch (error) {
        console.error('Lỗi đăng ký:', error);
        res.status(500).send('Lỗi đăng ký. Vui lòng thử lại.');
    }
};

const handleDeleteUser = async (req,res) => {
    await userService.deleteUser(req.params.id);
    return res.redirect('/user');
}
const getEditUser = async (req,res) => {
    let id = req.params.id;
    let user = await userService.getUserByID(id);
    console.log("user = ", user);
    return res.render("edit_user.ejs", { user});
}
const handleUpdateUser = async (req,res) => {
    let email = req.body.email;
    let username = req.body.username;
    let id = req.body.id;
    await userService.updateUserInfo(email,username,id);
    return res.redirect('/user');
}

module.exports = {
    handleHelloWorld,
    handleUserPage,
    handleLogin,
    handleRegister, handleCreateNewuser, handleLoginUser, handleDeleteUser,
    getEditUser, handleUpdateUser
}