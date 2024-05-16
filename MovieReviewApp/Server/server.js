const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./database/db");
app.use(express.json());

// importing Routes
const userRoute = require("./routes/usersRoute");
const artistsRoute = require("./routes/artistsRoute");
const imagesRoute = require("./routes/imagesRoute");
const moviesRoute = require("./routes/moviesRoute");
const reviewsRoute = require("./routes/reviewsRoute");
const filtersRoute = require("./routes/filtersRoute");

// exporting routes
app.use("/api/users", userRoute);
app.use("/api/artists", artistsRoute);
app.use("/api/images", imagesRoute);
app.use("/api/movies", moviesRoute);
app.use("/api/reviews", reviewsRoute);
app.use("/api/filters", filtersRoute);

const PORT = process.env.PORT || 6001;

// deploy on Render

const path = require("path");
__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/ReelReviewsApp/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "ReelReviewsApp", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Node JS Server is listening on PORT : ${PORT}`);
});
