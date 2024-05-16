const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    releaseDate: {
      type: Date,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "artists",
      required: true
    },
    actress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "artists",
      required: true
    },
    director: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "artists",
      required: true
    },
    genre: {
      type: String,
      required: true
    },
    language: {
      type: String,
      required: true
    },
    posters: {
      type: [],
      required: false
    },
    trailer: {
      type: String,
      required: true
    },
    cast: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "artists",
      required: false
    },
    rating: {
      type: Number,
      required: true,
      default: 0
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("movies", movieSchema);
