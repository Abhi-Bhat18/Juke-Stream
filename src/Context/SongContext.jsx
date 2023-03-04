import { createContext, useState, useRef } from "react";

export const SongContext = createContext();


export const SongContextState = ({ children }) => {
  const audio = new Audio();
  const song = {
    songUrl: "",
    songName: "",
    songArtist: "",
    songAlbum: "",

    setSongUrl: (url) => {
      song.songUrl = url;
    },
    setSongName: (name) => {
      song.songName = name;
    },
    setArtistName: (name) => {
      song.songArtist = name;
    },
    setAlbumName: (name) => song.songAlbum = name,
  };
  const [isPlaying,setIsPlaying] = useState(false)
  const [songList, setSongList] = useState([]);
  return <SongContext.Provider value={{song,audio,setSongList,songList,isPlaying,setIsPlaying}}>{children}</SongContext.Provider>;
};
