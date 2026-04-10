import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../../middlewares/auth.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as movieService from "./movie.services.js";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../utils/apiError.js";

export const addMovie = asyncHandler(async(req: AuthRequest, res: Response) =>{
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const coverPicFile = files?.["coverPic"]?.[0];

    if(!coverPicFile){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Please upload a cover picture" )
    }
    const newMovie = await movieService.addMovie(req.body, coverPicFile?.filename )

    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Movie added successfully",
        data: newMovie
    })
})

export const updateMovie = asyncHandler(async(req: AuthRequest, res: Response) =>{
    const movieID = req.params.id
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const coverPicFile = files?.["coverPic"]?.[0];

    const newMovie = await movieService.updateMovie(Number(movieID), req.body, coverPicFile?.filename )

    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Movie updated successfully",
        data: newMovie
    })
})

export const getAllMovies = asyncHandler(async(req: AuthRequest, res: Response) =>{
    const movies = await movieService.getAllMovies();

    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Movies fetched successfully",
        data: movies
    })
})

export const getMovieByID = asyncHandler(async(req: AuthRequest, res: Response) =>{
    const movieID = req.params;
    const movie = await movieService.getMovieByID(Number(movieID));

    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Movie fetched successfully",
        data: movie
    })
})

export const deleteMovie = asyncHandler(async(req: AuthRequest, res: Response) =>{
    const movieID = req.params.id;

    await movieService.deleteMovie(Number(movieID));
    res.status(StatusCodes.OK).json({
        success: true,
        message: "Movie deleted successfully",
        data: null
    })
})



