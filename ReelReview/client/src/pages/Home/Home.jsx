import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message, Rate } from "antd";
import { GetAllMovies } from "../../API/movies";
import { SetLoading } from "../../redux/loadersSlice";
import { useNavigate } from "react-router-dom";
import Filters from "../../components/Filters";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: "", genre: "", language: ""
  });

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllMovies(filters);
      setMovies(response.data);
      dispatch(SetLoading(false));
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [filters.genre, filters.language]);

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold text-gray-600">
          Welcome to the App : {user?.firstName}
        </h1>
        <Filters filters={filters} setFilters={setFilters}/>
        <div className="grid grid-cols-1 sm-grid-cols-2 lg:grid-cols-4 gap-10 text-gray-600">
          {movies.map((movie) => (
            <div
              key={movie?.id}
              className="cursor-pointer"
              onClick={() => navigate(`/movie/${movie?._id}`)}
            >
              <img
                src={movie?.posters[0] || ""}
                alt="POSTER"
                className="w-full sm:h-64 md:h-72 lg:h-96 xl:h-100 rounded"
              />
              <h1 className="text-xl font-semibold text-gray-600 mt-2">
                {movie?.name}
              </h1>
              <hr />

              <div className="flex justify-between text-sm font-semibold">
                <span>Language : </span>
                <span className="capitalize"> {movie?.language}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold">
                <span>Rating : </span>
                {/* <span>{movie?.rating || 0}</span> */}
                <Rate
                  disabled
                  defaultValue={movie?.rating || 0}
                  allowHalf
                  style={{ color: "orange" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
