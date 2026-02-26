import { Movie } from "../associations.js";


export const addMovie = async (req, res) => {
  try {
    const { title, description, duration, genre, releaseDate, trailerLink} = req.body;
    const coverPicFile = req.files?.["coverPic"]?.[0] || null;
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
      .json({ message: "Server error", error: error.message });
  }
};

export const getMoviesById = async(req, res) =>{
  
}

// 3. Delete Movie Logic
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
