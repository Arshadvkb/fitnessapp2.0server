import multer from "multer";
import crypto from "crypto";
import path from "path";

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    // Generate a unique filename
    crypto.randomBytes(16, (err, raw) => {
      if (err) return cb(err);
      cb(null, raw.toString("hex") + path.extname(file.originalname));
    });
  },
});

const fileFilter = (req, file, cb) => {
  // Accept only video files
  const allowedMimes = [
    "video/mp4",
    "video/quicktime",
    "video/x-msvideo",
    "video/x-matroska",
  ];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only MP4, MOV, AVI, and MKV videos are allowed."
      ),
      false
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
});

export default upload;
