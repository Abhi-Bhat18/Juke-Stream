import React, { useState, useEffect, useRef, useContext } from "react";
import stereo from "../assets/stereo.jpg";
import { SongContext } from "../Context/SongContext";

import { CiPlay1, CiPause1 } from "react-icons/ci";
import { FiSkipBack, FiSkipForward } from "react-icons/fi";

const AudioPlayer = () => {
  const { song, audio } = useContext(SongContext);
  const audioRef = useRef();
  const srcRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const progressBar = useRef();
  // console.log(audioRef.current.paused);
  useEffect(() => {
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });
  }, [audio.src]);

  // Toggle play/pause
  const togglePlayPause = () => {
    if (audio.paused) audio.play();
    else audio.pause();
    setIsPlaying(prev => !prev);
  };

  // Calculate time
  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  return (
    <div
      className={` fixed flex justify-around lg:justify-center lg:space-x-40 items-center bottom-0 right-0 left-0 bg-gray-900 text-white px-5 py-2 shadow-xl`}
    >
      <div className="flex space-x-5">
        <img src={stereo} alt="" className="rounded-lg w-12" />
        <div>
          <h3 className="text-lg">{song.songName}</h3>
          <p className="text-sm">{song.songArtist}</p>
        </div>
      </div>

      <audio ref={audioRef}>
        <source ref={srcRef} />
      </audio>
      <div className="flex space-x-3 lg:space-x-5">
        <button>
          <FiSkipBack />
        </button>
        <button onClick={togglePlayPause}>
          {isPlaying ? <CiPause1 /> : <CiPlay1 />}
        </button>
        <button>
          <FiSkipForward />
        </button>
      </div>

      <div className="hidden lg:flex space-x-5">
        <input
          type="range"
          min="0"
          max={duration}
          ref={progressBar}
          defaultValue={0}
          className=" "
        />
        <p>
          {calculateTime(parseInt(currentTime))}/
          {calculateTime(parseInt(duration))}
        </p>
      </div>
    </div>
  );
};

export default AudioPlayer;
