import { useState,useEffect,React,useRef } from 'react';
import { data } from '../data';
import {
  FaChevronLeft,
  FaChevronRight,
  FaRegPlayCircle,
  FaRegPauseCircle,
} from "react-icons/fa";

const Songcard = () => {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audRef = useRef();
  const { id, image, song } = data[index];
  

    const checkNumber = (number) => {
        if (number > data.length - 1) {
            return 0;
        }
        if (number < 0) {
            return data.length - 1;
        }
        return number;
    }

  const nextPerson = () => {
      setIsPlaying(false);
        setIndex((index) => {
            let newIndex = index + 1;
            return checkNumber(newIndex);
        });
    };

  const prevPerson = () => {
    setIsPlaying(false);
        setIndex((index) => {
            let newIndex = index - 1;
            return checkNumber(newIndex);
        });
  };

  const handlePlay = () => {
    audRef.current.play();
    setIsPlaying(true);
  }

  const handlePause = () => {
    audRef.current.pause();
    setIsPlaying(false);
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay()
    }
  };

  const handleTimeUpdate = () => {
    console.log("this is time update function");
    setCurrentTime(audRef.current.currentTime);
    setDuration(audRef.current.duration);
    if (audRef.current.currentTime === audRef.current.duration) {
      setIsPlaying(false);
    }
  };
  
  const handleSeek = (e) => {
    audRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  }

  const formatDuration = (durationSeconds) => {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes}:${formattedSeconds}`;
  }
  

  useEffect(() => {
    audRef.current.currentTime = 0;
      console.log("useEffect is running");
      audRef.current.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        console.log("cleanup function is running");
        audRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      };

  }, []);
  
  // useEffect(() => {
  //   if (currentTime === duration) {
  //     setIsPlaying(false);
  //   }
  // }, []);
    
    return (
      <>
        <section className="song_card">
          <div className="song_content">
          <img src={image} alt={id} />
          <input
            type="range"
            value={currentTime}
            min="0"
            max={duration}
            onChange={(e) => handleSeek(e)}
            />
          <audio src={song} ref={audRef} />
          <div className="track-duration">
            <p>{isPlaying ? formatDuration(currentTime) : "0:00"}</p>
            <p>{isPlaying ? formatDuration(duration) : "0:00"}</p>
          </div>

          <button onClick={handlePlayPause} className="song-btn">
            {isPlaying ? <FaRegPauseCircle /> : <FaRegPlayCircle />}
          </button>
          <div className="button-container">
            <button className="prev-btn" onClick={prevPerson}>
              <FaChevronLeft />
            </button>
            <button className="next-btn" onClick={nextPerson}>
              <FaChevronRight />
            </button>
          </div>
          </div>
        </section>
      </>
    );
}

export default Songcard