import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";


// --- Fix for __dirname in ES Modules ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // This points to the "uploads" folder at the root of your project
    const uploadPath = path.join(__dirname, "..", "uploads");
    callback(null, uploadPath);
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/i)) {
    return callback(new Error("Only image files are allowed"), false);
  }
  callback(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).fields([{ name: "coverPic", maxCount: 1 }]);

const uploadImage = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading (e.g., file too large)
      return res.status(400).json({ error: `Multer error: ${err.message}` });
    } else if (err) {
      // An unknown error occurred
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

export default uploadImage;
