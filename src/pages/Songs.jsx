import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import SongCard from "../components/SongCard";
import { SidebarContext } from "../Context/SibebarContext";

const Songs = () => {
  const { showMenu, setShowMenu } = useContext(SidebarContext);

  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState(null);

  useEffect(() => {
    if (showMenu) setShowMenu(false);
    const fetchSongs = async () => {
      const { data } = await axios.get("http://localhost:1337/api/v1/songs");
      setSongs(data["songs"]);
    };
    setLoading(true);
    fetchSongs();
    setLoading(false);
  }, []);

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <div onClick={closeMenu} className="bg-gray-900 p-5 space-y-2 min-h-screen">
      {loading && songs == null ? (
        <div>loading...</div>
      ) : !loading && songs ? (
        songs.map((song,index) => {
          return (
            <SongCard
              key={song._id}
              title={song.title}
              artistName={song.artist}
              songSrc={song.song}
              userId={song.uploadedBy}
              songId = {song._id}
              file = {song.file}
            />
          );
        })
      ) : (
        <div>no songs</div>
      )}
    </div>
  );
};

export default Songs;
