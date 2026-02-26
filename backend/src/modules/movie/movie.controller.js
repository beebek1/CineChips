import { Movie } from "../associations.js";


export const addMovie = async (req, res) => {
  try {
    const { title, description, duration, genre, releaseDate, trailerLink} = req.body;
    const coverPicFile = req.files?.["coverPic"]?.[0] || null;
    
    if (!coverPicFile) {
      return res.status(400).json({ message: "Please upload a cover picture" });
    }
    const coverPicName = coverPicFile.filename;

    const cleanTitle = title.replace(/\s+/g, " ").trim().toLowerCase();

    const movieExists = await Movie.findOne({ where: { title: cleanTitle } });
    if (movieExists) {
      return res.status(400).json({ message: "Movie already exists" });
    }

    const newMovie = await Movie.create({
      title: cleanTitle,
      description,
      duration,
      genre,
      releaseDate,
      trailerLink,
      coverPic : coverPicName
    });

    return res
      .status(201)
      .json({ message: "Movie added successfully", movie: newMovie });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error", message: error.message });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, duration, genre, releaseDate, trailerLink } =
      req.body;

      console.log(title, description, duration, genre, releaseDate, trailerLink, id)
    const movie = await Movie.findByPk(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    let coverPicName = movie.coverPic;
    const newFile = req.files?.["coverPic"]?.[0];

    if (newFile) {
      coverPicName = newFile.filename;
    }

    const cleanTitle = title
      ? title.replace(/\s+/g, " ").trim().toLowerCase()
      : movie.title;

    await movie.update({
      title: cleanTitle,
      description: description || movie.description,
      duration: duration || movie.duration,
      genre: genre || movie.genre,
      releaseDate: releaseDate || movie.releaseDate,
      trailerLink: trailerLink || movie.trailerLink,
      coverPic: coverPicName,
    });

    return res.status(200).json({
      message: "Movie updated successfully",
      movie,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


export const getAllMovie = async (req, res) => {
  try {
    const movies = await Movie.findAll({
      order: [['createdAt', 'DESC']] 
    });

    if (movies.length === 0) {
      return res.status(404).json({ message: "No movies found" });
    }

    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getMoviesById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Movie.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.status(200).json({ message: "Movie deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Error", error: error.message });
  }
};
