const router = require('express').Router();

const {addMovie} = require('../controllers/adminController');

router.post("/addmovie", addMovie);

module.exports = router;
