import { AbsoluteCenter, Alert } from "@chakra-ui/react";
import { useMicrophoneContext } from "@/hooks/useMicrophoneContext";

export const MicrophoneAccessWarning = () => {
  const { isPermissionDenied } = useMicrophoneContext();
  if (isPermissionDenied)
    return (
      <AbsoluteCenter transform={"none"} top={0} width={"100%"} left={0}>
        <Alert colorScheme="red">Cant Access Microphone</Alert>;
      </AbsoluteCenter>
    );

  return null;
};
