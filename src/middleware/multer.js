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
  // Accept video and image files
  const allowedMimes = [
    // Video files
    "video/mp4",
    "video/quicktime",
    "video/x-msvideo",
    "video/x-matroska",
    // Image files
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only MP4, MOV, AVI, MKV videos and JPEG, PNG, GIF, WEBP images are allowed."
      ),
      false
    );
  }
};

// Helper function to determine file size limit based on file type
const getFileSizeLimit = (file) => {
  if (file.mimetype.startsWith("video/")) {
    return 100 * 1024 * 1024; // 100MB for videos
  }
  return 5 * 1024 * 1024; // 5MB for images
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // Maximum limit (for videos)
  },
});

// Custom middleware to check file size based on file type
const fileTypeLimit = (req, res, next) => {
  if (!req.file) return next();

  const limit = getFileSizeLimit(req.file);
  if (req.file.size > limit) {
    const type = req.file.mimetype.startsWith("video/") ? "Video" : "Image";
    const sizeMB = Math.round(limit / (1024 * 1024));
    return res.status(400).json({
      message: `${type} file is too large. Maximum size allowed is ${sizeMB}MB`,
    });
  }
  next();
};

export { upload, fileTypeLimit };
