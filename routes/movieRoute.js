const router = require('express').Router();

const {addMovie, addShowTime, deleteMovie} = require('../controllers/adminController');

router.post("/addmovie", addMovie);
router.post("/addshowtime", addShowTime);
router.delete("/:id", deleteMovie);

module.exports = router;
