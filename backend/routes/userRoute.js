const router = require("express").Router();

const {  addUser, getUserById } = require("../controllers/userController");
const verifyEmail = require("../controllers/verifyEmail");

// router.get("/getallUsers", getAllUsers);
router.post("/register", addUser);
router.put("/getUserByid/:uid", getUserById);
router.get('/verify-email', verifyEmail);

module.exports = router;