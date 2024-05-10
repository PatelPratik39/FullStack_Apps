const router = require("express").Router();
const multer = require("multer");
const cloudinaryConfig = require("../config/cloudinaryConfig");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

//Multer configuration with basic common method
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});
// Global Image Upload API
router.post(
  '/upload-image',
  AuthMiddleware,
  multer({ storage }).single("image"),
  async (req, res) => {
    try {
      // if (!req.file) {
      //   return res
      //     .status(400)
      //     .json({ message: "No file uploaded", success: false });
      // }
      const response = await cloudinaryConfig.uploader.upload(req.file.path, {
        folder: "Reel-Review-App"
      });
      console.log("Cloudinary upload response:", response);
      const imageUrl = response.secure_url;
      res
        .status(200)
        .json({ message: "Image Uploaded", data: imageUrl, success: true });
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      res.status(500).json({ message: error.message, success: false });
    }
  }
);

module.exports = router;