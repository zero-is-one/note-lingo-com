import C4 from "@/assets/C4.mp3";
import A4 from "@/assets/A4.mp3";
import { useSamplerSynth } from "@/hooks/useSamplerSynth";

const map = {
  C4,
  A4,
};

export const useConcertinaSamplerSynth = () => {
  return useSamplerSynth(map);
};
