import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, message, Rate, Table } from "antd";
import { SetLoading } from "../../redux/loadersSlice";
import { GetAllReviews } from "../../API/reviews";
import { getDateTimeFormat } from "../../helpers/helper";

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const reviewsResponse = await GetAllReviews({ user: user._id });
      setReviews(reviewsResponse.data);
      dispatch(SetLoading(false));
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Movie",
      dataIndex: "movie",
      render: (text, record) => record.movie.name
    },
    {
      title: "Rating",
      dataIndex: "rating",
      render: (text, record) => <Rate disabled value={record.rating} />
    },
    {
      title: "Review",
      dataIndex: "comment"
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      render: (text, record) => getDateTimeFormat(record.createdAt)
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div className=" flex gap-5">
            <i className="ri-edit-2-fill" onClick={() => {}}></i>
            <i className="ri-delete-bin-6-fill" onClick={() => {}}></i>
          </div>
        );
      }
    }
  ];

  return <div>

    <Table  dataSource={reviews} columns={columns} />
  </div>;
};

export default UserReviews;
