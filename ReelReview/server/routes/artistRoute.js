// OLD FIle


// const Artist = require("../models/artistModel");
// const router = require("express").Router();
// const authMiddleware = require("../middlewares/AuthMiddleware");

// //Add new Artist
// router.post("/", authMiddleware, async (req, res) => {
//   try {
//     req.body.createdBy = req.userId;
//     await Artist.create(req.body);
//     res.json({ message: "Artist added Successfully", success: true });
//   } catch (error) {
//     res.status(500).json({ message: error.message, success: false });
//   }
// });

// // Get All Artist
// router.get("/", authMiddleware, async (req, res) => {
//   try {
//     const artists = await Artist.find().sort({ createdAt: -1 });
//     res.json({ data: artists, success: true });
//   } catch (error) {
//     res.status(500).json({ message: error.message, success: false });
//   }
// });

// // get Artist by ID

// router.get("/:id", authMiddleware, async (req, res) => {
//   try {
//     const artist = await Artist.findById(req.params.id);
//     res.json({ data: artist, success: true });
//   } catch (error) {
//     res.status(500).json({ message: error.message, success: false });
//   }
// });

// //update Artist
// router.put("/:id", authMiddleware, async (req, res) => {
//   try {
//     await Artist.findByIdAndUpdate(req.params.id, req.body);
//     res.json({ message: "Artist Updated Successfully", success: true });
//   } catch (error) {
//     res.status(500).json({ message: error.message, success: false });
//   }
// });

// //Delete Artist
// router.delete("/:id", authMiddleware, async (req, res) => {
//   try {
//     await Artist.findByIdAndDelete(req.params.id);
//     res.json({ message: "Artist Deleted Successfully", success: true });
//   } catch (error) {
//     res.status(500).json({ message: error.message, success: false });
//   }
// });

// module.exports = router;
