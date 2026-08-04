import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tempDir = path.join(__dirname, "../../public/temp");

const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, tempDir);
    },
    filename: function (_req, file, cb) {
        // unique prefix prevents name collisions
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

export default upload;
