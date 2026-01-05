const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendEmail = require("../helpers/sendEmail.js");

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


//registring user
const addUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }else if (!role){
      return res.status(400).json({message: "role missing"});
    }
    
    //search for similar email
    const user = await User.findOne({where:{email : email}})
    if(user){
      return res.status(400).json({
        message: `user with this email already exists ${email}`
      })
    }

    //generating verificationToken
    const verificationToken = crypto.randomBytes(32).toString("hex");

    //verificationToken expires within 1 hour
    const verificationTokenExpires = new Date(Date.now()+ 1 * 60 * 60 * 1000);

    //for hasing the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    //adding user to database
    const newUser = await User.create({
      username,
      email,
      password : hashedPassword,
      role,
      verificationToken,
      verificationTokenExpires
    });

    const verifyLink = `http://localhost:3000/api/user/verify-email?token=${verificationToken}`

      await sendEmail(
        email,
        "Verify you Email address",
        `
          <h2>verify your identity</h2>
          <p>if you haven't login from email then don't veirfy your email</p>
          <a href= ${verifyLink}>Click to Verify</a>

        `
      )

      return res.status(201).json({
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

  }catch(error) {
    message= "server side error",
    error = error.message
  }
}


const loginUser= async(req, res) =>{

  const{email, password} = req.body;

  if(!email || !password){
    return res.status(400).json({
      success : false,
      message : "no email or password provided"
    })
  }

  const user = await User.findOne({where: {email : email}});

  if(!user){
    return res.status(400).json({
      success : false,
      message : "email or password mismatched"
    })
  }

  const isMatched = await bcrypt.compare(password, user.password)

  if(!isMatched){
    return res.status(400).json({
      success : false,
      message : "email or password mismatched"
    })
  }

  return res.status(200).json({
      success : true,
      message : "user logged in"
    })
}



module.exports = { addUser, getUserById, updateUser, loginUser};