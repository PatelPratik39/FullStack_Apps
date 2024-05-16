import React, { useEffect, useState } from "react";
import { Tabs, Form, Select, Button, message, Upload } from "antd";
import { antValidationError } from "../../../helpers/helper";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../redux/loadersSlice";
import { GetAllArtists } from "../../../API/artist";
import { AddMovie, GetMovieById, UpdateMovie } from "../../../API/movies";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { UploadImage } from "../../../API/images.js";

const MovieForm = () => {
  const [artists, setArtists] = useState([]);
  const [movie, setMovie] = useState(null);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const getArtists = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllArtists();
      //   below line set all the data but i want to get data in artist id and name label-value so i ned to create simeple object into setArtist()
      //   setArtists(response.data);
      setArtists(
        response.data.map((artist) => ({
          value: artist._id,
          label: artist.name
        }))
      );
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  const getMovie = async (id) => {
    try {
      dispatch(SetLoading(true));
      const response = await GetMovieById(id);
      response.data.releaseDate = moment(response.data.releaseDate).format(
        "YYYY-MM-DD"
      );
      response.data.cast = response.data?.cast?.map((artist) => artist._id);
      response.data.actor = response.data?.actor?._id;
      response.data.actress = response.data?.actress?._id;
      response.data.director = response.data?.director?._id;
      // console.log(response);
      setMovie(response.data);
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  // form Submit
  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));
      // const response = await AddMovie(values);
      let response;
      if (params?.id) {
        response = await UpdateMovie(params.id, values);
      } else {
        response = await AddMovie(values);
      }
      message.success(response.message);
      dispatch(SetLoading(false));
      navigate("/admin");
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  // Image Upload Logic
  const imageUpload = async () => {
    try {
      // to upload image, first i need to convert a file into binary format so backend can process it.
      const formData = new FormData();
      formData.append("image", file);
      dispatch(SetLoading(true));
      const response = await UploadImage(formData);
      if (response.success) {
        const response2 = await UpdateMovie(movie._id, {
          ...movie,
          posters: [...(movie?.posters || []), response.data]
        });
        setMovie(response2.data);
        setFile(null);
      }
      dispatch(SetLoading(false));
      message.success(response.message);
      // navigate("/admin");
      // setShowArtistForm(false);
      // form.setFieldValue({ profilePic: response.data });
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  // Delete Image from upload-update tab

  const deleteImage = async (image) => {
    try {
      dispatch(SetLoading(true));
      const response = await UpdateMovie(movie._id, {
        ...movie,
        posters: movie?.posters?.filter((item) => item !== image)
      });
      dispatch(SetLoading(false));
      message.success(response.message);
      // navigate("/admin");
      setMovie(response.data);
      // setShowArtistForm(false);
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    getArtists();
    if (params?.id) {
      getMovie(params.id);
    }
  }, []);

  // useEffect(() => {
  //   if (params?.id) {
  //     getMovie(params.id);
  //   }
  // }, []);
  return (
    (movie || !params.id) && (
      <div>
        <h1 className="text-gray-600 text-xl font-semibold uppercase">
          {params.id ? "Edit Movie" : "Add Movie"}
        </h1>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Details" key="1">
            <Form
              layout="vertical"
              className="flex flex-col gap-5"
              onFinish={onFinish}
              initialValues={movie}
            >
              <div className="grid grid-cols-3 gap-5">
                <Form.Item
                  label="Name : "
                  name="name"
                  rules={antValidationError}
                  className="col-span-2"
                >
                  <input />
                </Form.Item>
                <Form.Item
                  label="Release Date : "
                  name="releaseDate"
                  rules={antValidationError}
                >
                  <input type="date" />
                </Form.Item>
              </div>
              <Form.Item
                label="Description : "
                name="description"
                rules={antValidationError}
              >
                {/* <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} /> */}
                <textarea autosize={{ minRows: 3, maxRows: 6 }} />
              </Form.Item>
              <div className="grid grid-cols-3 gap-5">
                <Form.Item
                  label="Actor : "
                  name="actor"
                  rules={antValidationError}
                >
                  <Select options={artists} showSearch />
                </Form.Item>
                <Form.Item
                  label="Actress : "
                  name="actress"
                  rules={antValidationError}
                >
                  <Select options={artists} showSearch />
                </Form.Item>
                <Form.Item
                  label="Director : "
                  name="director"
                  rules={antValidationError}
                >
                  <Select options={artists} showSearch />
                </Form.Item>
              </div>
              <div className="grid grid-cols-3 gap-5">
                <Form.Item
                  label="Genre :"
                  name="genre"
                  rules={antValidationError}
                >
                  <Select>
                    {[
                      { label: "Action", value: "action" },
                      { label: "Adventure", value: "adventure" },
                      { label: "Comedy", value: "comedy" },
                      { label: "Drama", value: "drama" },
                      { label: "Fantasy", value: "fantasy" },
                      { label: "Horror", value: "horror" },
                      { label: "Mystery", value: "mystery" },
                      { label: "Romance", value: "romance" },
                      { label: "Sci-Fi", value: "sci-fi" },
                      { label: "Suspense", value: "suspense" },
                      { label: "Thriller", value: "thriller" }
                    ].map((genre) => (
                      <Select.Option key={genre.value} value={genre.value}>
                        {genre.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Language :"
                  name="language"
                  rules={antValidationError}
                >
                  <Select>
                    {[
                      { label: "English", value: "english" },
                      { label: "Hindi", value: "hindi" },
                      { label: "Spanish", value: "spanish" },
                      { label: "French", value: "french" },
                      { label: "German", value: "german" },
                      { label: "Italian", value: "italian" },
                      { label: "Japanese", value: "japanese" },
                      { label: "Korean", value: "korean" },
                      { label: "Russian", value: "russian" }
                    ].map((language) => (
                      <Select.Option
                        key={language.value}
                        value={language.value}
                      >
                        {language.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Trailer : "
                  name="trailer"
                  rules={antValidationError}
                >
                  <input type="text" />
                </Form.Item>
              </div>
              <Form.Item label="Cast & Crew :" name="cast">
                <Select options={artists} mode="tags" />
              </Form.Item>
              <div className="flex justify-end gap-5">
                <Button
                  onClick={() => {
                    navigate("/admin");
                  }}
                >
                  {" "}
                  Cancel
                </Button>
                <Button htmlType="submit" type="primary">
                  {" "}
                  Save
                </Button>
              </div>
            </Form>
          </Tabs.TabPane>
          {/* <Tabs.TabPane tab="Posters" key="2"></Tabs.TabPane> */}
          <Tabs.TabPane tab="Posters" key="2" disabled={!movie}>
            <div className="flex flex-wrap gap-5 mb-5">
              {movie?.posters?.map((image) => (
                <div
                  key={image}
                  className="flex gap-5 border border-dashed p-3"
                >
                  <img
                    src={image}
                    alt="image"
                    className="w-20 h-20 object-cover"
                  />
                  <i
                    className="ri-delete-bin-6-fill"
                    onClick={() => {
                      deleteImage(image);
                    }}
                  ></i>
                </div>
              ))}
            </div>
            <Upload
              onChange={(info) => {
                setFile(info.file);
              }}
              beforeUpload={() => false}
              listType="picture"
            >
              <Button>Upload Movie Poster </Button>
            </Upload>
            {/*  footer */}
            <div className="flex justify-end gap-5 mt-5">
              <Button
                onClick={() => {
                  navigate("/admin");
                }}
              >
                {" "}
                Cancel
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  imageUpload();
                }}
              >
                Upload Now
              </Button>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  );
};

export default MovieForm;
