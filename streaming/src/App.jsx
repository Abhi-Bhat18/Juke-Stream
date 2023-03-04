import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Songs from "./pages/Songs";
import UploadSong from "./pages/UploadSong";
import Login from "./pages/Login";
import CreatePlayList from "./pages/CreatePlaylist"
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import { SidebarContextState } from "./Context/SibebarContext";
import { SongContextState } from "./Context/SongContext";
import AudioPlayer from "./utils/AudioPlayer";
import Register from "./pages/Register";
import Playlist from "./pages/Playlist";

const Layout = () => {
  return (
    <div className="relative z-0 w-screen">
      <SidebarContextState>
        <SongContextState>
          <Navbar />
          <div className="">
            <Outlet />
          </div>
          <div className="">
            {/* <FooterNav />  */}
            {/* <MusicPlayer /> */}
            <AudioPlayer/>
          </div>
          {/* <SongCard/> */}
        </SongContextState>
      </SidebarContextState>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/upload",
        element: <UploadSong />
      },
      {
        path: "/explore",
        element: <Songs />
      },
      {
        path: "/playlists",
        element: <CreatePlayList />
      },
      {
        path: "/playlist/:id",
        element: <Playlist />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register/>,
  },
]);

const App = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <RouterProvider router={router} />
      </div>
    </>
  );
};
export default App;
