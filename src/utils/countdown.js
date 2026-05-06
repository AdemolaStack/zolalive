import { useState, useEffect } from "react";
import { pad } from "./formatTime";

export function useCountdown(kickoffISO) {
  const target = new Date(kickoffISO).getTime();

  const calc = () => {
    const diff = target - Date.now();
    if (diff <= 0) {
      return { days: "00", hours: "00", minutes: "00", seconds: "00", isLive: true };
    }
    const s = Math.floor(diff / 1000);
    return {
      days:    pad(Math.floor(s / 86400)),
      hours:   pad(Math.floor((s % 86400) / 3600)),
      minutes: pad(Math.floor((s % 3600) / 60)),
      seconds: pad(s % 60),
      isLive:  false,
    };
  };

  const [state, setState] = useState(calc);

  useEffect(() => {
    if (state.isLive) return;
    const id = setInterval(() => setState(calc()), 1000);
    return () => clearInterval(id);
  }, [kickoffISO, state.isLive]);

  return { ...state, isDone: state.isLive };
}