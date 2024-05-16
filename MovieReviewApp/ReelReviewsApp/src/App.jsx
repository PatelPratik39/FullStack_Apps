import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import ProtectedPage from "./components/ProtectedPage";
import Profile from "./pages/Profile/Profile";
import Spinner from "./components/Spinner";
import { useSelector } from 'react-redux';
import AdminIndex from "./pages/Admin/adminIndex";
import MovieForm from "./pages/Admin/Movies/MovieForm";
import MovieInfo from "./pages/MovieInfo/MovieInfo";
import ArtistInfo from "./pages/Artist/ArtistInfo";
// import IndexAdmin from "./pages/Admin/indexAdmin";


function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <>
      {loading && <Spinner />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedPage>
                <Home />
              </ProtectedPage>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedPage>
                <Profile />
              </ProtectedPage>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <ProtectedPage>
                <MovieInfo />
              </ProtectedPage>
            }
          />
          <Route
            path="/artist/:id"
            element={
              <ProtectedPage>
                <ArtistInfo />
              </ProtectedPage>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedPage>
                <AdminIndex />
                {/* <IndexAdmin /> */}
              </ProtectedPage>
            }
          />
          <Route
            path="/admin/movies/add"
            element={
              <ProtectedPage>
                <MovieForm />
              </ProtectedPage>
            }
          />
          <Route
            path="/admin/movies/edit/:id"
            element={
              <ProtectedPage>
                <MovieForm />
              </ProtectedPage>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
