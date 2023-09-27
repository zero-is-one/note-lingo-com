import { useState, createContext } from "react";
import * as Tone from "tone";

const mic = new Tone.UserMedia();
const analyser = new Tone.Analyser({ type: "waveform" });
mic.connect(analyser);

type MicrophoneContextType = {
  requestMicrophone: () => Promise<void>;
  hasPermission: boolean;
  isPermissionDenied: boolean;
  analyser: Tone.Analyser;
  mic: Tone.UserMedia;
};

export const MicrophoneContext = createContext<
  MicrophoneContextType | undefined
>(undefined);

export const MicrophoneProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isPermissionDenied, setIsPermissionDenied] = useState(false);

  const requestMicrophone = async () => {
    await Tone.start();
    mic
      .open()
      .then(() => {
        setHasPermission(true);
      })
      .catch((e) => {
        console.error(e);
        setHasPermission(false);
        setIsPermissionDenied(true);
      });
  };

  return (
    <MicrophoneContext.Provider
      value={{
        requestMicrophone,
        hasPermission,
        isPermissionDenied,
        analyser,
        mic,
      }}
    >
      {children}
    </MicrophoneContext.Provider>
  );
};
