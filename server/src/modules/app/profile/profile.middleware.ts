import multer, { FileFilterCallback } from "multer";
import { AuthRequest } from "../../../types/v1.types";

const upload = multer({

  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max

  fileFilter: (
    req: AuthRequest, 
    file: Express.Multer.File, 
    cb: FileFilterCallback
  ) => {

    const allowed = ["image/jpeg", "image/png"];    // alows only png and jpeg

    if (allowed.includes(file.mimetype)) 
      cb(null, true);  // no error & accepts file

    else 
      cb(new Error("Only jpg and png images types are allowed"));
    
  },
});

export default upload;