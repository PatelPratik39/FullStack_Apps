// this file is use to create a Artists table

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, message, Table } from "antd";
import ArtistForm from "./ArtistForm";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../redux/loadersSlice";
import { GetAllArtists, DeleteArtist } from "../../../API/artist.js";
import { getDateFormat } from "../../../helpers/helper";

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [showArtistForm, setShowArtistForm] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // logic to fetch the Artist

  const fetchArtist = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllArtists();
      setArtists(response.data);
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  // Delete Artist data

  const deleteArtist = async (id) => {
    try {
      dispatch(SetLoading(true));
      const response = await DeleteArtist(id);
      // console.log(response.data); //debugg purpose
      message.success(response.message);
      fetchArtist();
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  // Colums are most Important for render the Artist details on Page using Tabular format

  const columns = [
    {
      title: "Artist",
      dataIndex: "Profile",
      render: (text, record) => {
        // const imageUrl = record?.images?.[0] || "";
        const imageUrl = record?.profilePic || record?.images?.[0] || "";
        return (
          // <img src={record?.profilePic} alt="" className="w-20 h-20 rounded" />
          <img src={imageUrl} alt="" className="w-20 h-20 rounded" />
        );
      }
    },
    {
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "Date Of Birth",
      dataIndex: "dob",
      render: (text, record) => {
        return getDateFormat(text);
      }
    },
    {
      title: "Debut Movie",
      dataIndex: "debutMovie"
    },
    {
      title: "Debut Year",
      dataIndex: "debutYear"
    },
    // below column will be used for edit and delete operation
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div className=" flex gap-5">
            <i
              className="ri-edit-2-fill"
              onClick={() => {
                setSelectedArtist(record);
                setShowArtistForm(true);
              }}
            ></i>
            <i
              className="ri-delete-bin-6-fill"
              onClick={() => {
                deleteArtist(record._id);
              }}
            ></i>
          </div>
        );
      }
    }
  ];

  useEffect(() => {
    fetchArtist();
  }, []);

  return (
    <>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setSelectedArtist(null);
            setShowArtistForm(true);
          }}
        >
          {" "}
          Add Artist
        </Button>
      </div>
      {/* Create Table that renders column and data from columns */}
      <Table dataSource={artists} columns={columns} className="mt-5" />
      {/* below selected Artist will select the row of artist that i want to update then use reloadData= { } where i am fetching artist data and 
      then i will pass it to the Artistform */}
      {showArtistForm && (
        <ArtistForm
          showArtistForm={showArtistForm}
          setShowArtistForm={setShowArtistForm}
          selectedArtist={selectedArtist}
          setSelectedArtist={setSelectedArtist}
          reloadData={fetchArtist}
        />
      )}
    </>
  );
};

export default Artists;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button, message, Table } from "antd";
// import ArtistForm from "./ArtistForm";
// import { useDispatch } from "react-redux";
// import { SetLoading } from "../../../redux/loadersSlice";
// import { DeleteArtist, GetAllArtists } from "../../../API/artist";
// import { getDateFormat } from "../../../helpers/helper";
// import { useNavigate } from "react-router-dom";
// import { Button } from "antd";
// import { useDispatch } from "react-redux";
// import { DeleteArtist } from '../../../API/artist';

// const Artists = () => {
//   const [artists, setArtists] = useState([]);
//   const dispatch = useDispatch();
//   const [showArtistForm, setShowArtistForm] = useState(false);
//   const [selectedArtist, setSelectedArtist] = useState(null);
//   const navigate = useNavigate();

//   // First need to fectch all the Artists for Update Artist data
//   const fetchArtists = async () => {
//     try {
//       dispatch(SetLoading(true));
//       const response = await GetAllArtists();
//       // console.log(response.data);
//       const updatedArtists = response.data.map((artist) => {
//         let images = artist.images || [];

//         // Check if profilePic is a link, if so, move it to the images array
//         if (artist.profilePic && typeof artist.profilePic === "string") {
//           images.push(artist.profilePic);
//         }

//         // Update the artist object with the new images array
//         return { ...artist, images };
//       });
//       setArtists(updatedArtists);
//       // setArtists(response.data);
//       dispatch(SetLoading(false));
//     } catch (error) {
//       message.error(error.message);
//       dispatch(SetLoading(false));
//     }
//   };

// // Delete Artist data

// const deleteArtist = async (id) => {
//   try {
//     dispatch(SetLoading(true));
//     const response = await DeleteArtist(id);
//     // console.log(response.data); //debugg purpose
//     message.success(response.message);
//     fetchArtists();
//     dispatch(SetLoading(false));
//   } catch (error) {
//     message.error(error.message);
//     dispatch(SetLoading(false));
//   }
// };

//   // i need to set Columns for table data that should be match with mongodb database EXACTLY

//   const columns = [
//     // {
//     //   title: "Artist",
//     //   dataIndex: "profile",
//     //   render: (text,record) => {
//     //     return <img src={record?.profilePic} alt="" className="w-20 h-20 rounded" />;
//     //   }
//     // },
//     {
//       title: "Artist",
//       dataIndex: "profile",
//       render: (text, record) => {
//         const imageUrl = record?.images?.[0] || "";
//         return <img src={imageUrl} alt="" className="w-20 h-20 rounded" />;
//       }
//     },
//     {
//       title: "Name",
//       dataIndex: "name"
//     },
//     {
//       title: "DOB",
//       dataIndex: "dob",
// render: (text, record) => {
//   return getDateFormat(text);
// }
//     },
//     {
//       title: "Proffession",
//       dataIndex: "proffession"
//     },
//     {
//       title: "Debut Year",
//       dataIndex: "debutYear"
//     },
//     {
//       title: "Debut Movie",
//       dataIndex: "debutMovie"
//     },
// // below column will be used for edit and delete operation
// {
//   title: "Actions",
//   dataIndex: "actions",
//   render: (text, record) => {
//     return (
//       <div className=" flex gap-5">
//         <i
//           className="ri-edit-2-fill"
//           onClick={() => {
//             setSelectedArtist(record);
//             setShowArtistForm(true);
//           }}
//         ></i>
//         <i
//           className="ri-delete-bin-6-fill"
//           onClick={() => {
//             deleteArtist(record._id);
//           }}
//         ></i>
//       </div>
//     );
//   }
// }
//   ];

//   useEffect(() => {
//     fetchArtists();
//   }, []);

//   return (
//     <>
//       <div>
//         <div className="flex justify-end">
//           <Button
//             onClick={() => {
//               setSelectedArtist(null);
//               setShowArtistForm(true);
//             }}
//           >
//             Add Artist
//           </Button>
//         </div>
//         <Table dataSource={artists} columns={columns} className="mt-5" />
//         {showArtistForm && (
//           <ArtistForm
//             showArtistForm={showArtistForm}
//             setShowArtistForm={setShowArtistForm}
//             selectedArtist={selectedArtist}
//             reloadData={fetchArtists}
//           />
//         )}
//       </div>
//     </>
//   );
// };

// export default Artists;
