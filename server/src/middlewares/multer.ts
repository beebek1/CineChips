import multer, { MulterError } from "multer";
import path from "path";
import { fileURLToPath } from "url";
import type { Request, Response, NextFunction } from "express";

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void
  ) => {
    const uploadPath = path.join(__dirname, "..", "uploads");
    callback(null, uploadPath);
  },

  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void
  ) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|webp|avif)$/i)) {
    return callback(new Error("Only image files are allowed"));
  }
  callback(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).fields([{ name: "coverPic", maxCount: 1 }]);

const uploadImage = (req: Request, res: Response, next: NextFunction) => {
  upload(req, res, (err) => {
    if (err instanceof MulterError) {
      return res.status(400).json({
        success: false,
        message: `Multer error: ${err.message}`,
      });
    }

    if (err instanceof Error) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    next();
  });
};

export default uploadImage;