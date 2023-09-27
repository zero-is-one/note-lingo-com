import { useContext } from "react";
import { MicrophoneContext } from "@/contexts/Microphone";

export const useMicrophoneContext = () => {
  const context = useContext(MicrophoneContext);
  if (!context) {
    throw new Error(
      "useMicrophoneContext must be used within a Microphone Provider"
    );
  }
  return context;
};
