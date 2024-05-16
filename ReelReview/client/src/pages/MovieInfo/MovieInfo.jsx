import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, message, Rate } from "antd";
import { GetMovieById } from "../../API/movies";
import { SetLoading } from "../../redux/loadersSlice";
import { useNavigate, useParams } from "react-router-dom";
import { getDateFormat , getDateTimeFormat } from "../../helpers/helper";
import ReviewForm from "./ReviewForm";
import { GetAllReviews } from "../../API/reviews";

const MovieInfo = () => {
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [movie, setMovie] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetMovieById(id);
      const reviewResponse = await GetAllReviews({ movie: id });
      setReviews(reviewResponse.data);
      setMovie(response.data);
      dispatch(SetLoading(false));
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    movie && (
      <div>
        <div className="flex flex-col lg:flex-row gap-10 mb-5">
          <img
            src={movie?.posters?.[0] || ""}
            alt=""
            className=" h-72 w-96 lg:h-[600px] lg:w-[600px] rounded"
          />
          <div className="flex flex-col">
            <h1 className="text-[50px] font-semibold text-gray-600 mb-3">
              {movie?.name}
            </h1>
            <hr />
            <div className="flex flex-col gap-1 text-gray-600 w-96 text-lg mt-5">
              <div className="flex justify-between">
                <span>Language :</span>
                <span className="capitalize">{movie?.language}</span>
              </div>
              <div className="flex justify-between">
                <span>Release Date :</span>
                <span className="capitalize">
                  {getDateFormat(movie?.releaseDate)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Genre :</span>
                <span className="capitalize">{movie?.genre}</span>
              </div>
              <div className="flex justify-between">
                <span>Director :</span>
                <span className="capitalize">{movie?.director?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Actor :</span>
                <span className="capitalize">{movie?.actor?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Actress :</span>
                <span className="capitalize">{movie?.actress?.name}</span>
              </div>
            </div>
          </div>
        </div>

        <span className="py-5 text-gray-600 text-lg">{movie?.description}</span>

        <div className="mt- mb-10">
          <h1 className="text-gray-600 font-semibold text-md"> Cast & Crew </h1>
          <div className="flex mt-5 gap-5">
            {movie?.cast.map((artist, index) => {
              return (
                <div
                  // key={artist?.id}
                  key={index}
                  className="cursor-pointer"
                  onClick={() => navigate(`/artist/${artist?._id}`)}
                >
                  <img
                    src={artist?.images[0] || ""}
                    alt=""
                    className="w-32 h-24 rounded"
                  />
                  <hr />
                  <span className="text-sm text-gray-600 items-center">
                    {artist?.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <hr />
        <div className="flex justify-between items-center mt-5">
          <span className="text-xl font-semibold">Reviews : </span>
          <Button type="default" onClick={() => setShowReviewForm(true)}>
            Add Reviews
          </Button>
        </div>
        <div className="mt-5 flex flex-col gap-2">
          {reviews.map((review) => {
            return (
              <div
                key={review?._id}
                className="flex justify-between border-solid border p-2 rounded-sm border-gray-300"
              >
                <div className="flex flex-col">
                  <span className="text-gray-600 font-semibold text-md">
                    {review?.user?.firstName}
                  </span>
                  <Rate
                    disabled
                    defaultValue={review?.rating || 0}
                    allowHalf
                    style={{ color: "orange" }}
                    className="mt-4"
                  />
                  <span>{review?.comment}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-600 text-sm ">
                    {getDateTimeFormat(review?.createdAt)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {/* import Review pop up model */}
        {showReviewForm && (
          <ReviewForm
            movie={movie}
            reloadData={getData}
            showReviewForm={showReviewForm}
            setShowReviewForm={setShowReviewForm}
          />
        )}
      </div>
    )
  );
};

export default MovieInfo;
