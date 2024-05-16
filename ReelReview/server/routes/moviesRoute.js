const Movie = require("../models/movieModel");
const router = require("express").Router();
const authMiddleware = require("../middlewares/AuthMiddleware");

//Add Movie

router.post("/", authMiddleware, async (req, res) => {
  try {
    req.body.createdBy = req.userId;
    await Movie.create(req.body);
    res
      .status(200)
      .json({ message: "Movie added Successfully!! ✅ ", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// GET ALL Movies
router.get("/", async (req, res) => {
  try {
    const filters = req.query;
    const query = {};
    if (filters.genre) {
      query.genre = filters.genre;
    }
    if (filters.language) {
      query.language = filters.language;
    }
    const movies = await Movie.find(query)
      .sort({ createdAt: -1 })
      .populate("actor")
      .populate("actress")
      .populate("director")
      .populate("createdBy")
      .sort({ createdAt: -1 });
    res.status(200).json({
      data: movies,
      success: true
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// Get Movie by ID
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
      .populate("actor")
      .populate("actress")
      .populate("director")
      .populate("cast")
      .populate("createdBy");
    res.status(200).json({
      data: movie,
      success: true,
      message: "Movie fetched Successfully!!  ✅ "
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// Update Movie by ID
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Movie Updated Successfully!! 🎾",
      data: updatedMovie
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// Delete Movie By ID
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndDelete(req.params.id, {
      new: true
    });
    res.status(200).json({
      message: "Movie Deleted Successfully!!  ✅ ",
      success: true
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, success: false, data: updatedMovie });
  }
});

// Get Movies by Artist Id
router.get("/get-movies-by-artist/:id", async (req, res) => {
  try {
    const artistId = req.param.id;
    const movies = await Movie.find({
      $or: [
        { actor: artistId },
        { actress: artistId },
        { director: artistId },
        { cast: { $in: [artistId] } }
      ]
    });
    res.status(200).json({ data: movies, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

module.exports = router;
