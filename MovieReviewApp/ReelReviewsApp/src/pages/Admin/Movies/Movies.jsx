import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table, message } from "antd";
import { useDispatch } from "react-redux";
import { DeleteMovie, GetAllMovies } from "../../../API/movies";
import { SetLoading } from "../../../redux/loadersSlice";
import { getDateFormat } from "../../../helpers/helper";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getMovies = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllMovies();
      setMovies(response.data);
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };
  useEffect(() => {
    getMovies();
  }, []);

  // Delete Movie Logic
  const deleteMovie = async (id) => {
    try {
      dispatch(SetLoading(true));
      const response = await DeleteMovie(id);
      message.success(response.success);
      getMovies();
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };
  // need to create columns for the movie which hshould as same as moviesModel

  const columns = [
    {
      title: "Movie",
      dataIndex: "posters",
      render: (text, record) => {
        const imageUrl = record?.posters?.[0] || "";
        return <img src={imageUrl} alt="" className="w-20 h-20 rounded" />;
      }
    },

    {
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      render: (text) => getDateFormat(text)
    },
    {
      title: "Genre",
      dataIndex: "genre"
    },
    {
      title: "Language",
      dataIndex: "language"
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className=" flex gap-5">
            <i
              className="ri-edit-2-fill"
              onClick={() => {
                navigate(`/admin/movies/edit/${record._id}`);
              }}
            ></i>
            <i
              className="ri-delete-bin-6-fill"
              onClick={() => {
                deleteMovie(record._id);
              }}
            ></i>
          </div>
        );
      }
    }
  ];

  return (
    <>
      <div>
        <div className="flex justify-end">
          <Button onClick={() => navigate("/admin/movies/add")}>
            Add Movie
          </Button>
        </div>
        <div className="mt-5">
          <Table dataSource={movies} columns={columns} />
        </div>
      </div>
    </>
  );
};

export default Movies;
