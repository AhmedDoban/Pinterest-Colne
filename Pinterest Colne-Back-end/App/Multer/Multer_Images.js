import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Uploads/Images");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const FileName = `Image-${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}.${ext}`;
    cb(null, FileName);
  },
});

const FileFilter = (req, file, cb) => {
  const TYPE = file.mimetype.split("/")[0];
  if (TYPE === "image") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload_image = multer({ storage: storage, fileFilter: FileFilter });

export default upload_image;
