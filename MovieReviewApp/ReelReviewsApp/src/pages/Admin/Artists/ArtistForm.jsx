import React, { useState } from "react";
import { Modal, Form, Input, message, Tabs, Upload, Button } from "antd";
import { antValidationError } from "../../../helpers/helper";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../redux/loadersSlice.js";
import { AddArtist, UpadateArtist } from "../../../API/artist";
import moment from "moment";
import { UploadImage } from "../../../API/image.js";

const ArtistForm = ({
  showArtistForm,
  setShowArtistForm,
  selectedArtist,
  reloadData
}) => {
  const dispatch = useDispatch();
  const [file, setFile] = React.useState(null);
  const [selectedTab, setSelectedTab] = React.useState(null);
  const [form] = Form.useForm();
  // Date is not rendering as correct format so i need to convert it into a specific format
  if (selectedArtist) {
    selectedArtist.dob = moment(selectedArtist.dob).format("YYYY-MM-DD");
  }

  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true)); //set loader true at initial stage
      // const response = await AddArtist(values); //fetching api and adding values in
      let response;
      if (selectedArtist) {
        response = await UpadateArtist(selectedArtist._id, values); //this line of code update the existing record from selected id
      } else {
        response = await AddArtist(values); // adding new artist
      }
      reloadData(); // whenever i try to above operation, i need to relaod the data
      // console.log(response); //consol log for reposne for debugging purpose
      dispatch(SetLoading(false)); // set loader false
      message.success(response.message); //fethcing a message from backend using message
      setShowArtistForm(false); //close the pop up artist form after success
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  // UPLOAD Image Logic

  const imageUpload = async () => {
    try {
      // sending a image data as binary form thats why i used here file
      const formData = new FormData();
      formData.append("image", file);
      dispatch(SetLoading(true));
      const response = await UploadImage(formData);
      if (response.success) {
        await UpadateArtist(selectedArtist._id, {
          ...selectedArtist,
          images: [...(selectedArtist?.images || []), response.data]
        });
      }
      reloadData();
      dispatch(SetLoading(false));
      message.success(response.message);
      // message.success("Image uploaded successfully");
      setShowArtistForm(false);
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  // DELETE Image
  const deleteImage = async (image) => {
    try {
      dispatch(SetLoading(true));
      const response = await UpadateArtist(selectedArtist._id, {
        ...selectedArtist,
        images: selectedArtist?.images?.filter((item) => item !== image)
      });
      reloadData();
      dispatch(SetLoading(false))
      message.success(response.message);
      setShowArtistForm(false)
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  return (
    <>
      <Modal
        open={showArtistForm}
        onCancel={() => setShowArtistForm(false)}
        // title="Add Artist"
        // title={selectedArtist ? "Edit Artist" : "Add Artist"}
        title=""
        centered
        width={800}
        // okText="Add"
        okText={selectedArtist ? "Update" : "Add"}
        // onOk={() => {
        //   form.submit();
        // }}
        onOk={() => {
          if (selectedTab === "1") {
            form.submit();
          } else {
            imageUpload();
          }
        }}
      >
        <>
          <div className="h1 text-center font-semibold text-gray-600 text-xl uppercase">
            {selectedArtist ? "Update" : "Add "} Artist
          </div>
          <Tabs defaultActiveKey="1" onChange={(key) => setSelectedTab(key)}>
            <Tabs.TabPane tab="Basic Info" key="1">
              <Form
                layout="vertical"
                className="flex flex-col gap-5"
                onFinish={onFinish}
                form={form}
                initialValues={selectedArtist}
              >
                <Form.Item
                  label="Name : "
                  name="name"
                  rules={antValidationError}
                >
                  <input />
                </Form.Item>
                <div className="grid grid-cols-2 gap-5">
                  <Form.Item
                    label="Date of Birth : "
                    name="dob"
                    rules={antValidationError}
                  >
                    <input type="date" />
                  </Form.Item>
                  <Form.Item
                    label="Debut Year : "
                    name="debutYear"
                    rules={antValidationError}
                  >
                    <input type="number" />
                  </Form.Item>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <Form.Item
                    label="Profession : "
                    name="proffession"
                    rules={antValidationError}
                  >
                    <select name="" id="">
                      <option value="">-- Select --</option>
                      <option value="Actor">Actor</option>
                      <option value="Actress">Actress</option>
                      <option value="Director">Director</option>
                      <option value="Producer">Producer</option>
                      <option value="Music Director">Music Director</option>
                      <option value="Singer">Singer</option>
                      <option value="Lyricist">Lyricist</option>
                      <option value="Cinematographer">Cinematographer</option>
                      <option value="Camera Men">Camera Men</option>
                      <option value="Editor">Editor</option>
                      <option value="Stunt Men">Stunt Men</option>
                    </select>
                  </Form.Item>
                  <Form.Item
                    label="Debut Movie : "
                    name="debutMovie"
                    rules={antValidationError}
                  >
                    <input type="text" />
                  </Form.Item>
                </div>
                <Form.Item label="Bio : " name="bio" rules={antValidationError}>
                  <Input.TextArea />
                </Form.Item>
                <Form.Item
                  label="Profile Picture : "
                  // name="profilePic"
                  name="images"
                  rules={antValidationError}
                >
                  <input type="text" placeholder="Image Url" />
                </Form.Item>
              </Form>
            </Tabs.TabPane>
            {/* crated two tabs where one tab has Artist details and second tab has  Image upload tab that is only enable if user click on "Edit" option */}
            <Tabs.TabPane tab="Images" key="2" disabled={!selectedArtist}>
              {/* i need to render all the imagesthat i have uploaded in order to delate the image  */}
              <div className="flex flex-wrap gap-5 mb-10">
                {selectedArtist?.images?.map((image) => (
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
              {/* we need antd upload button */}
              <Upload
                onChange={(info) => {
                  setFile(info.file);
                }}
                beforeUpload={() => false}
                listType="picture"
                // showUploadList={false}
              >
                <Button>Upload 📌 </Button>
              </Upload>
            </Tabs.TabPane>
          </Tabs>
        </>
      </Modal>
    </>
  );
};

export default ArtistForm;
