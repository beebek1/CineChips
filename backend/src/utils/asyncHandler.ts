import type { Request, Response, NextFunction } from "express";

export const asyncHandler = (requestHandler : any) =>{
    return (req: Request, res: Response, next: NextFunction) =>{
        Promise.resolve(requestHandler(req, res, next))                 //if everything went right then pass normally          
        .catch((err) => next(err));                                      // and if not then pass the error      
    }
}