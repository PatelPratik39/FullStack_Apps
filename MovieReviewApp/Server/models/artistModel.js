const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    dob: {
      type: Date,
      required: true
    },
    bio: {
      type: String,
      required: true
    },
    profilePic: {
      type: String,
      required: true
    },
    debutYear: {
      type: Number,
      required: true
    },
    debutMovie: {
      type: String,
      required: true
    },
    proffession: {
      type: String,
      required: true
    },
    // i used "createBy" because app should know that who created Artists
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("artists", artistSchema);
