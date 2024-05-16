import { Modal, Rate, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../redux/loadersSlice";
import { AddReviews, UpdateReview } from "../../API/reviews";

const ReviewForm = ({
  movie,
  reloadData,
  showReviewForm,
  setShowReviewForm,
  selectedReview
}) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const addReview = async () => {
    // console.log("You have cliked me!!");
    try {
      dispatch(SetLoading(true));
      let response = null;
      if (selectedReview) {
        response = await UpdateReview({
          _id: selectedReview._id,
          movie: movie?._id,
          rating,
          comment
        });
      } else {
        response = await AddReviews({
          movie: movie._id,
          rating,
          comment
        });
      }
      message.success(response.message);
      reloadData();
      setShowReviewForm(false);
      dispatch(SetLoading(false));
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (selectedReview) {
      setRating(selectedReview.rating);
      setComment(selectedReview.comment);
    }
  }, [selectedReview]);

  return (
    <Modal
      open={showReviewForm}
      onCancel={() => setShowReviewForm(false)}
      centered
      title={selectedReview ? "Update Review " : "Add Review"}
      width={800}
      onOk={addReview}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="flex w-full">
          <span>Movie : </span>
          <span className="ml-2 font-semibold">{movie?.name}</span>
        </div>
        <Rate
          value={rating}
          onChange={(value) => setRating(value)}
          allowHalf
          style={{ color: "orange" }}
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your Comments"
          cols="30"
          rows="10"
        ></textarea>
      </div>
    </Modal>
  );
};

export default ReviewForm;
