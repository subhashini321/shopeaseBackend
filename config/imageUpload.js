import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, global.uploadURL);
  },
  filename: (req, file, cb) => {
    let fileName = file.originalname;
    let ext = path.extname(fileName);
    if (!ext || ext === "")
      cb(null, Date.now() + "-" + `${file.originalname}.ogg`);
    // Rename the file to include the timestamp and extension
    else cb(null, Date.now() + "-" + file.originalname); // Rename the file to include the timestamp
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/webp" ||
    file.mimetype === "image/svg+xml" ||
    file.mimetype === "text/csv" ||
    file.mimetype === "audio/mpeg" ||
    file.mimetype === "audio/wav" 
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};



const storageVideoAndImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, global.uploadURL); // Reuse the same upload directory or specify a new one
  },
  filename: (req, file, cb) => {
    let fileName = file.originalname;
    let ext = path.extname(fileName);
    if (!ext || ext === "")
      cb(null, Date.now() + "-" + `${file.originalname}.ogg`);
    else cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilterVideoAndImage = (req, file, cb) => {
  // console.log("Processing file:", file.originalname, "MIME type:", file.mimetype);
  if (
      file.mimetype.startsWith("image/") || // Accepts all images
      file.mimetype.startsWith("video/")   // Accepts all videos
  ) {
      cb(null, true);
  } else {
      cb(new Error("Unsupported file type for video/image"), false);
  }
};

export const upload = multer({ storage: storage, fileFilter: fileFilter });
export const uploadVideoAndImage = multer({
  storage: storageVideoAndImage,
  fileFilter: fileFilterVideoAndImage,
});