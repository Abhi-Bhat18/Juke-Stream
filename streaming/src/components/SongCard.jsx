import React from "react";
import { useContext, useState, useRef } from "react";
import axios from "axios";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";

import { SongContext } from "../Context/SongContext";
import { SlOptionsVertical } from "react-icons/sl";
import { MdDeleteOutline,MdOutlinePlaylistAdd,MdQueuePlayNext} from 'react-icons/md'
import musicbg from "../assets/musicbg.jpg";

const SongCard = ({ title, artistName, songSrc, userId, songId, file }) => {
  const { song, audio, setSongList, setIsPlaying, isPlaying } =
    useContext(SongContext);

  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const decoded = decodeToken(token);
  const [showOptions, setShowOptions] = useState(false);

  // Display the options
  const displayOptions = () => {
    setShowOptions((prev) => !prev);
  };

  // Play the song when the user clicks on the song card
  const handlePlay = () => {
    song.setSongName(title);
    song.setArtistName(artistName);
    audio.src = `http://localhost:1337/api/v1/stream/${songSrc}`;
    audio.load();
    audio.play();
  };

  const headers = {
    "x-auth-token": localStorage.getItem("access_token"),
  };
  // Delete the song

  const deleteSong = async () => {
    const { data } = await axios.delete(
      `http://localhost:1337/api/v1/song/delete/${songId}?file=${file}`,
      {
        headers,
      }
    );
  };
  const handleDelete = () => {
    console.log("delete");
    deleteSong();
  };

  // Add the song to the playlist
  const handleAddToPlaylist = () => {
    setSongList((prev) => [...prev, { title, artistName, songSrc }]);
    navigate("/playlists");
  };

  //Play the song next
  const handlePlayNext = () => {
    // play the song next
  };

  return (
    <div className="flex relative  bg-gray-800 text-white justify-between items-center border-b-[1px] p-2 lg:w-[70vw] mx-auto">
      <div onClick={handlePlay} className="flex space-x-5">
        <img src={musicbg} alt="" className="w-16" />
        <div className="text-sm lg:text-lg">
          <div>{title}</div>
          <div>{artistName}</div>
        </div>
      </div>

      {/* <---------------------------Desktop Options-------------------------> */}
      <div className="hidden lg:flex justify-start items-center p-2 space-x-5">
            <button onClick={handleAddToPlaylist}><MdOutlinePlaylistAdd size={30}/></button>
            <button><MdQueuePlayNext size={25}/></button>
            {
              // if user is the owner of the song
              // then show the delete option
              decoded.id === userId && (
                <button onClick={handleDelete} className=" ">
                  <MdDeleteOutline size={25}/>
                </button>
              )
            }
          </div>
      {/* <---------------------------Mobile Options-------------------------> */}
      <div
        onClick={displayOptions}
        onMouseOut={() => setShowOptions(false)}
        className="relative block lg:hidden"
      >
        <SlOptionsVertical size={15} />
      </div>
      {showOptions && (
        <div className="absolute right-0 z-10 w-36 bg-gray-900 ">
          <ul className="flex justify-start flex-col items-start space-y-2 p-2">
            <button onClick={handleAddToPlaylist}>Add to playlist</button>
            <button>play next</button>
            {
              // if user is the owner of the song
              // then show the delete option
              decoded.id === userId && (
                <button onClick={handleDelete} className=" ">
                  Delete
                </button>
              )
            }
          </ul>
        </div>
      )}
    </div>
  );
};

export default SongCard;
