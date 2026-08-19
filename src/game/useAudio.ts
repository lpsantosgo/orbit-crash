import { useCallback, useRef } from "react";

export function useAudio() {
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

  const play = useCallback((sound: 'launch' | 'crash' | 'win') => {
    try {
      if (!audioRefs.current[sound]) {
        audioRefs.current[sound] = new Audio(`/sounds/${sound}.mp3`);
      }
      const audio = audioRefs.current[sound];
      audio.currentTime = 0;
      audio.play().catch(err => console.warn("Audio play failed:", err));
    } catch (e) {
      console.warn("Audio setup failed:", e);
    }
  }, []);

  return { play };
}
