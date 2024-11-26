import { useEffect, useRef } from "react";
import { playerStore } from "@/stores/usePlayerStore";
const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);
  const { currentSong, isPlaying, playNext } = playerStore();

  useEffect(() => {
    //play and pause audio
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    // handle song end logic
    const audio = audioRef.current;
    const handleEnded = () => {
      playNext();
    };
    audio?.addEventListener("ended", handleEnded);
    return () => {
      audio?.removeEventListener("ended", handleEnded);
    };
  }, [playNext]);

  useEffect(() => {
    //handle song change
    if (!audioRef.current || !currentSong) return;
    const audio = audioRef.current;
    const hasSongChanged = prevSongRef.current !== currentSong?.audioUrl;
    if (hasSongChanged) {
      audio.src = currentSong?.audioUrl;
      audio.currentTime = 0;
      prevSongRef.current = currentSong?.audioUrl;
      if (isPlaying) audio.play();
    }
  }, [currentSong, isPlaying]);
  return <audio ref={audioRef} />;
};

export default AudioPlayer;
