const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({attributes: { id, email, username}});   //exclude: ['password']
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getUserById = async (req, res) => {
  try {
    const id  = req.params.id;
    const user = await User.findByPk(id);
    return res.json({
      user: {id: user.id, name: user.username},
      message : " User found successfully"
    })
  }catch (error) {
    return res.status(500).json({
      message : " Error fetching user ",
      error : error.message
    });
  } 

}

// const isUser = await User.findOne({ where: { username } });
// const isEmail = await User.findOne({ where: { email } });
// if(isUser || isEmail){
//   return res.status(400).json({
//     message: "Username or Email already exists"
//   });
// }

const addUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      username,
      email,
      password : hashedPassword
    });

    res.status(201).json({
      message: "User added successfully",
      user: newUser
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


const updateUser = async (req, res) =>{
  try{
    const{id} = req.params;
    const {username, email, password } = req.body;
    const user = await User.findByPk(id);
    if(!user){
      return res.status(404).json({
        message : "user not found",
      });
    }

    let hashedPassword = user.password;
    if ( password ){
      hashedPassword = await bcrypt.hash(password,10);
    }
    await user.update({
      username : username || user.username,
      email : email || user.email,
      password :hashedPassword
    })

    return res.status(200).json({
      message: "User Updated successfully",
      user,
    })

  }catch{

  }
}

module.exports = { addUser, getAllUsers, getUserById, updateUser};