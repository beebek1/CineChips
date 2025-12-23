const router = require("express").Router();

const { getAllUsers, addUser, getUserById } = require("../controllers/userController");

router.get("/getallUsers", getAllUsers);
router.post("/register", addUser);
router.put("/getUserByid/:uid", getUserById);

module.exports = router;