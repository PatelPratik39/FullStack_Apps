import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, message, Rate } from "antd";
import { SetLoading } from "../../redux/loadersSlice";
import { useNavigate, useParams } from "react-router-dom";
import { GetArtistById } from "../../API/artist";
import { getDateFormat } from "../../helpers/helper";
import { GetMoviesByArtistId } from "../../API/movies";

const ArtistInfo = () => {
  const [artist, setArtist] = useState(null);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const artistReposne = await GetArtistById(id);
      setArtist(artistReposne.data);
      const moviesResponse = await GetMoviesByArtistId(id);
      setMovies(moviesResponse.data);
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
    <div>
      <div className="flex flex-col lg:flex-row gap-10 mb-5">
        <img
          src={artist?.images[0] || ""}
          alt=""
          className=" h-72 w-96 lg:h-[600px] lg:w-[700px] rounded"
        />
        <div className="flex flex-col"  style={{ width: '100%' }}>
          <h1 className="text-2xl font-semibold text-gray-600 mb-3">
            {artist?.name}
          </h1>
          <hr />
          <div className="flex flex-col gap-1 text-gray-600 w-96 text-sm mt-5">
            <div className="flex justify-between">
              <span>Proffession :</span>
              <span className="capitalize">{artist?.proffession}</span>
            </div>
            <div className="flex justify-between">
              <span>Date Of Birth :</span>
              <span className="capitalize">{getDateFormat(artist?.dob)}</span>
            </div>
            <div className="flex justify-between">
              <span>Debut Year: </span>
              <span className="capitalize">{artist?.debutYear}</span>
            </div>
            <div className="flex justify-between">
              <span>Debut Movie :</span>
              <span className="capitalize">{artist?.debutMovie}</span>
            </div>
            <div className="flex gap-10 justify-between">
              <span>Biography:</span>
              <span className="capitalize">{artist?.bio}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt- mb-10">
        <h1 className="text-gray-600 font-semibold text-md"> Movies </h1>
        <div className="flex mt-5 gap-5">
          {movies.map((movie) => {
            return (
              <div
                key={artist?.id}
                // key={index}
                className="cursor-pointer"
                onClick={() => navigate(`/movie/${movie?._id}`)}
              >
                <img
                  src={movie?.posters[0] || ""}
                  alt=""
                  className="w-32 h-24 rounded"
                />
                <hr />
                <span className="text-sm text-gray-600 items-center">
                  {movie?.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ArtistInfo;
