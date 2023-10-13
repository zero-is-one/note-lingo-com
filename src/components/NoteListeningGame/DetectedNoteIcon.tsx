import { Button } from "@chakra-ui/button";
import { PiMicrophoneStageFill } from "react-icons/pi";
import { useMicrophoneContext } from "@/hooks/useMicrophoneContext";
import { Text } from "@chakra-ui/react";

export const DetectedNoteIcon = ({ note }: { note: string | null }) => {
  const { hasPermission, isPermissionDenied } = useMicrophoneContext();

  if (isPermissionDenied) return <Text>Microphone access denied</Text>;
  if (!hasPermission) return <Text>Microphone has not been requested</Text>;

  return (
    <Button
      leftIcon={!note ? <PiMicrophoneStageFill /> : undefined}
      colorScheme="teal"
      variant="ghost"
      size="lg"
      fontSize={"7cqw"}
      mt={4}
    >
      {note}
    </Button>
  );
};
