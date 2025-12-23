const Movie = require('../models/movieModel');

const addMovie = async (req, res) => {
    try{
        console.log("im here")
        const {title, description, duration, genre, releaseDate} = req.body;

        if(!req.body){
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        
        const newMovie = await Movie.create({
            title,
            description,
            duration,
            genre,
            releaseDate
        });

        res.status(201).json({
            message : "movie added successfully"
        });



    }catch(error){
        res.status(500).json({
            message: "server error",
            error : error.message
        })
    }
}

module.exports = {addMovie}
