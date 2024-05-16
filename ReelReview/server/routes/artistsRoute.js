// Artist API file

const Artist = require("../models/artistModel");
const router = require("express").Router();
const authMiddleware = require("../middlewares/AuthMiddleware");

//Add new Artist
router.post("/", authMiddleware, async (req, res) => {
  try {
    req.body.createdBy = req.userId;
    await Artist.create(req.body);
    // console.log(response1);
    res.json({ message: "Artist added Successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});
// GET ALL ARTIST
router.get("/", authMiddleware, async (req, res) => {
  try {
    const artists = await Artist.find().sort({ createdAt: -1 });
    // console.log(artists);
    res.json({ data: artists, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});
// get Artist by ID

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    // console.log(artist);
    res.json({ data: artist, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

//update Artist
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedArtists = await Artist.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    console.log(updatedArtists);
    res.json({
      message: "Artist Updated Successfully",
      success: true,
      data: updatedArtists
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

//Delete Artist
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const response3 = await Artist.findByIdAndDelete(req.params.id);
    console.log(response3);
    res.json({ message: "Artist Deleted Successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});
module.exports = router;
