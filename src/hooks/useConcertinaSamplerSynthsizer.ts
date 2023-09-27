import C4 from "@/assets/C4.mp3";
import A4 from "@/assets/A4.mp3";
import { useSamplerSynthsizer } from "@/hooks/useSamplerSynthsizer";

export const useConcertinaSamplerSynthsizer = () => {
  return useSamplerSynthsizer({
    C4,
    A4,
  });
};
