import React, { useEffect, useContext } from "react";
import axios from "axios";
import PlaylistCard from "../components/PlaylistCard";
import { GrFormAdd } from "react-icons/gr";
import { SidebarContext } from "../Context/SibebarContext";

const CreatePlaylist = () => {

  const { showMenu, setShowMenu } = useContext(SidebarContext);
  const [cretePlaylist, setCreatePlaylist] = React.useState(false);
  const [playlists, setPlaylists] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  // Open Create playlist card
  const createCardOpen = () => {
    setCreatePlaylist(true);
  };

  //Close create playlist card
  const createCardClose = () => {
    setCreatePlaylist(false);
  };

  const headers = {
    "Content-Type": "application/json",
    "X-Auth-Token": localStorage.getItem("access_token"),
  };

  // Create a playlist
  const createPlaylist = async () => {
    const playlistName = document.getElementById("playlistName").value;
    if (playlistName === "") return alert("Please enter a playlist name");
    const {data,status} = await axios.post(
      "http://localhost:1337/api/v1/playlist/create",
      { playlistName },
      { headers }
    );
    console.log(status)
    if(status === 200){
      alert("Playlist created successfully")
      setCreatePlaylist(false)
      setLoading(true)
      setPlaylists(null)
      fetchPlaylists()
      setLoading(false)
    }
  };

  // fetching playlists
  const fetchPlaylists = async () => {
    const { data } = await axios.get("http://localhost:1337/api/v1/playlist", {
      headers,
    });
    setPlaylists(data["playlists"]);
  };


  useEffect(() => {
    if (showMenu) setShowMenu(false);
    setLoading(true);
    fetchPlaylists();
    setLoading(false);
  }, []);

  return (
    <div className="bg-slate-800 text-teal-200 flex justify-start flex-col p-5 space-y-10 min-h-screen pb-32 ">
      <p className="text-2xl">All Playlists</p>

      {/* <---------------------------Playlist cards-----------------> */}
      {loading && playlists == null ? (
        <div>loading...</div>
      ) : !loading && playlists ? (
        playlists.map((playlist) => {
          return (
            <PlaylistCard
              key={playlist._id}
              playlistName={playlist.playlistName}
              playlistId={playlist._id}
              noSongs={playlist.songs.length}
            />
          );
        })
      ) : (
        <div className="flex justify-center items-center text-2xl">No Playlists Found</div>
      )}
      {/* <---------------------------Create playlist button and card-----------------> */}

      <div
        onClick={createCardOpen}
        className="bg-[#ffd700] fixed rounded-xl px-2 text-lg  bottom-20 right-5 flex justify-center items-center space-x-1"
      >
        <GrFormAdd />
        <span className="text-gray-900">Create Playlist</span>
      </div>
      {/* Create PlayList Card */}
      {cretePlaylist && (
        <div className="bg-gray-900 fixed top-0 left-0 w-full h-full flex justify-center items-center">
          <div className="bg-white p-10 flex flex-col justify-center items-center space-y-5 rounded-xl relative">
            <button
              onClick={createCardClose}
              className="absolute top-2 right-5 text-black"
            >
              close
            </button>
            <input
              type="text"
              id="playlistName"
              placeholder="Playlist Name"
              className="w-3/4 h-10 outline-none border-b-black text-gray-900 border-b-[1px]"
            />
            <button
              onClick={createPlaylist}
              className="bg-[#ffd700] px-5 py-1 rounded-md lg:rounded-xl shadow-lg text-[#7d0000] text-sm"
            >
              Create
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePlaylist;
