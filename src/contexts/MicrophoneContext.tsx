import { useState, createContext } from "react";
import * as Tone from "tone";

const mic = new Tone.UserMedia();
const analyser = new Tone.Analyser({ type: "waveform", size: 2048 });
mic.connect(analyser);

export type MicrophoneContextType = {
  requestMicrophone: () => Promise<void>;
  hasPermission: boolean;
  isPermissionDenied: boolean;
  analyserNode: AnalyserNode | null;
  mediaStream: MediaStream | null;
  sampleRate: number;
  fftSize: number;
  audioContext: AudioContext | null;
};

export const MicrophoneContext = createContext<
  MicrophoneContextType | undefined
>(undefined);

const defaultSampleRate = 44100;
const defaultFFTSize = 2048;

export const MicrophoneProvider: React.FC<{
  children: React.ReactNode;
  requestSampleRate?: number;
  requestFFTSize?: number;
}> = ({ children, requestSampleRate, requestFFTSize }) => {
  const [sampleRate, setSampleRate] = useState<number>(
    requestSampleRate || defaultSampleRate
  );
  const [fftSize, setFFTSize] = useState<number>(
    requestFFTSize || defaultFFTSize
  );
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [isPermissionDenied, setIsPermissionDenied] = useState(false);

  const requestMicrophone = async () => {
    await navigator.mediaDevices
      .getUserMedia({
        audio: {
          //echoCancellation: false,
          noiseSuppression: false,
        },
      })
      .then((stream) => {
        setMediaStream(stream);

        resetAudioContext(stream);
      })
      .then(() => {
        setHasPermission(true);
      })
      .catch((err) => {
        console.log(err);
        setIsPermissionDenied(true);
      });
  };

  function dispose() {
    if (mediaStream) {
      mediaStream.getAudioTracks().forEach((track) => {
        track.stop();
      });
    }
    if (audioContext) audioContext.close();
    if (analyserNode) analyserNode.disconnect();
  }

  function resetAudioContext(stream: MediaStream) {
    dispose();
    setSampleRate(requestSampleRate || defaultSampleRate);
    setAnalyserNode(null);
    setAudioContext(null);

    const freshAudioContext = new AudioContext({
      sampleRate: requestSampleRate,
    });

    const freshAnalyserNode = new AnalyserNode(freshAudioContext, {
      fftSize: requestFFTSize || defaultFFTSize,
    });

    freshAudioContext
      .createMediaStreamSource(stream)
      .connect(freshAnalyserNode);

    setSampleRate(freshAudioContext.sampleRate);
    setFFTSize(freshAnalyserNode.fftSize);
    setAnalyserNode(freshAnalyserNode);
    setAudioContext(freshAudioContext);
  }

  return (
    <MicrophoneContext.Provider
      value={{
        requestMicrophone,
        hasPermission,
        isPermissionDenied,
        analyserNode,
        mediaStream,
        sampleRate,
        audioContext,
        fftSize,
      }}
    >
      {children}
    </MicrophoneContext.Provider>
  );
};
