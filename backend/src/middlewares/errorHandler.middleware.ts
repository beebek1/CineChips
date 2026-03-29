import { z, ZodError } from "zod";
import type { Request, Response, NextFunction } from 'express';

export const validator = (schema : z.ZodType) =>
    async(req:Request, res: Response, next: NextFunction) =>{
        try{
            await schema.parseAsync({
                body: req.body, 
                query: req.query, 
                params: req.params,
            });

            next();
        }catch(error){
            if(error instanceof ZodError){
                return res.json({
                    success: false,
                    message: "Validation Error",
                    errors: error.issues.map((err)=>({
                        path: err.path[1],
                        message: err.message,
                    })),
                });
            }
            next(error)
        }
    }