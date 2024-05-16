const Review = require("../models/reviewModel");
const Movie = require("../models/movieModel");
const router = require("express").Router();
const authMiddleware = require("../middlewares/AuthMiddleware");
const mongoose = require("mongoose");

// ADD REVIEWS

router.post("/", authMiddleware, async (req, res) => {
  try {
    req.body.user = req.userId;
    const newReview = new Review(req.body); //this line of code push the user review from UI to mongodb Collection
    await newReview.save();

    // calculate average rating of the movie and update in movie using mongoDB query
    const movieId = new mongoose.Types.ObjectId(req.body.movie);
    const averageRating = await Review.aggregate([
      // {
      //   $match: { movie: req.body.movie }
      // },
      {
        $match: { movie: movieId }
      },
      {
        $group: {
          _id: "$movie",
          averageRating: { $avg: "$rating" }
        }
      }
    ]);
    // console.log(averageRating);
    const averageRatingValue = averageRating[0]?.averageRating || 0;

    await Movie.findOneAndUpdate(
      { _id: req.body.movie },
      {
        rating: averageRatingValue
      }
    );

    res
      .status(200)
      .json({ message: "Review added Success ✅ ", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// GET ALL REVIEWS BY ID
router.get("/", async (req, res) => {
  try {
    // const { movie } = req.query;
    const reviews = await Review.find(req.query || {})
      .sort({ createdAt: -1 })
      .populate("user")
      .populate("movie");
    res.status(200).json({ data: reviews, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// Update Review
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    // calculate average rating of the movie and update in movie using mongoDB query
    const movieId = new mongoose.Types.ObjectId(req.body.movie);
    const averageRating = await Review.aggregate([
      // {
      //   $match: { movie: req.body.movie }
      // },
      {
        $match: { movie: movieId }
      },
      {
        $group: {
          _id: "$movie",
          averageRating: { $avg: "$rating" }
        }
      }
    ]);
    console.log(averageRating);
    const averageRatingValue = averageRating[0]?.averageRating || 0;

    await Movie.findOneAndUpdate(
      { _id: req.body.movie },
      {
        rating: averageRatingValue
      }
    );

    res
      .status(200)
      .json({ message: "Review UPDATED Successfully ✅ ", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// Delete Review
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    // calculate average rating of the movie and update in movie using mongoDB query
    const movieId = new mongoose.Types.ObjectId(req.body.movie);
    const averageRating = await Review.aggregate([
      // {
      //   $match: { movie: req.body.movie }
      // },
      {
        $match: { movie: movieId }
      },
      {
        $group: {
          _id: "$movie",
          averageRating: { $avg: "$rating" }
        }
      }
    ]);
    // console.log(averageRating);
    const averageRatingValue = averageRating[0]?.averageRating || 0;

    await Movie.findOneAndUpdate(
      { _id: req.body.movie },
      {
        rating: averageRatingValue
      }
    );

    res
      .status(200)
      .json({ message: "Review DELETED SuccessfuLLy ✅ ", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

module.exports = router;
