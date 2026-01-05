const Movie = require('../models/movieModel');
const ShowTime = require('../models/showtimeModel');


//for adding new movie
const addMovie = async (req, res) => {
    try{
        const {title, description, duration, genre, releaseDate} = req.body

        if(!title|| !description ||  !duration ||  !releaseDate){
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const cleantitle = title.replace(/\s+/g, ' ').trim().toLowerCase();

        const movieExists = await Movie.findOne({where: {title : cleantitle}})
        if(movieExists){
            return res.status(400).json({
                message: "this movie already exists"
            })
        }

        const newMovie = await Movie.create({
            title: cleantitle,
            description,
            duration,
            genre,
            releaseDate
        })

        res.status(201).json({
            message : "movie added successfully",
            movie : newMovie
        });

    }catch(error){
        res.status(500).json({
            message: "server error",
            error : error.message
        })
    }
}


//for adding showtime for each movie
const addShowTime = async ( req, res ) => {
    try{
        const {movieName, theaterId, date, startTime} = req.body

        if(!movieName || !theaterId|| !date|| !startTime){
            return res.status(400).json({
                message: "please fill all the fields",
            })
        }

        const movie = await Movie.findOne({where: { title: movieName}})
        if(!movie){
            return res.status(404).json({
                message: "no movie found "
            });
        }
        const endTime = calculateEndTime(startTime, movie.duration);

       //add showtime to a movie
       const addShowTime = await ShowTime.create({
        movieId: movie.id,
        theaterId,
        date,
        startTime,
        endTime
    }) 

       return res.status(201).json({
        message: `show time added to the movie ${movieName} at ${startTime} and ending at${endTime}`,
        showtime: addShowTime
       })
    }catch(error){
        res.status(500).json({
            message : "server side error ",
            error : error.message
        })
    }
}


//for calculating the show ending time
function calculateEndTime(startTime, duration){

    console.log(startTime ,duration )

    const [hours, minutes] = startTime.split(":").map(Number);                  
    const startDate = new Date();

    startDate.setHours(hours, minutes, 0, 0);  //we filled value to hours and minutes and 0, 0 are seconds and milliseconds gotcha?

    startDate.setMinutes(startDate.getMinutes() + Number(duration)) //it automatically converts minutes to hours

    const endHours = startDate.getHours().toString().padStart(2, "0");
    const endMinutes = startDate.getMinutes().toString().padStart(2, "0");

    return `${endHours}:${endMinutes}`;
}


//for deleting movie
const deleteMovie = async(req, res) =>{
    try{
        const{ id } = req.params;
        const deleted = await Movie.destroy({where: {id}})

        if(!deleted){
            return res.status(404).json({
                message: "movie not found"
            })
        }
        return res.status(201).json({
            message: `movie deleted named`
        })

    }catch(error){
        return res.status(400).json({
            message: "something went wrong",
            error: message.error
        })
    }
}

//for updating movies
const updateMovie = async(req, res) =>{
    try{

    }catch(error){
        message = "something went wrong ",
        error = message.error
    }
}

//for deleting showTime
// const deleteShowTime = async(req, res) =>{
//     try{
//         const{}
//     }
// }



module.exports = {addMovie, addShowTime, deleteMovie, updateMovie}
