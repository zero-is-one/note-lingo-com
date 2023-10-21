import { PiMicrophoneStageFill } from "react-icons/pi";
import { useMicrophoneContext } from "@/hooks/useMicrophoneContext";
import { Text, HStack } from "@chakra-ui/react";

export const DetectedNoteIcon = ({ note }: { note: string | null }) => {
  const { hasPermission, isPermissionDenied } = useMicrophoneContext();

  if (isPermissionDenied) return <Text>Microphone access denied</Text>;
  if (!hasPermission) return <Text>Microphone has not been requested</Text>;

  return (
    <HStack p={4} width={90} justifyContent={"flex-end"}>
      <span>{note || "--"}</span>
      <PiMicrophoneStageFill size={20} />
    </HStack>
  );
};
