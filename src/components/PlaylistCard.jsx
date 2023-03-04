import React,{useState,useContext} from "react";
import axios from "axios";  
import { SongContext } from "../Context/SongContext";
import playlist from "../assets/playlist.jpg";
import { CgPlayListAdd } from "react-icons/cg";
import { Link } from "react-router-dom";
const PlaylistCard = ({playlistName,playlistId,noSongs}) => {

    const {songList} = useContext(SongContext)
    const [loading,setLoading] = useState(false)


    const addSongToPlaylist = async () => {
        if(songList.length === 0) return alert("Please select a song");
        setLoading(true)
        const headers = {
            "Content-Type": "application/json",
            "X-Auth-Token": localStorage.getItem("access_token"),
            };
        const {data,status} = await axios.post(`http://localhost:1337/api/v1/playlist/add/${playlistId}`,songList,{headers})
        console.log(data)
        console.log(status)
        setLoading(false)
    }

  return (
    <div className="flex border-b-2 pb-4 items-center justify-between">
      <Link to={`/playlist/${playlistId}`} className="flex space-x-5">
        <img src={playlist} alt="" className="w-20" />
        <div>
          <p>{playlistName}</p>
          <p>Songs - {noSongs}</p>
        </div>
      </Link>
      <button onClick={addSongToPlaylist}>
        <CgPlayListAdd size={35} />
      </button>
    </div>
  );
};

export default PlaylistCard;
