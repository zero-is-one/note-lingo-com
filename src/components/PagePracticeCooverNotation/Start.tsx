import { Card, Center, CardBody, Button } from "@chakra-ui/react";
import { useMicrophoneContext } from "@/hooks/useMicrophoneContext";

export const Start = () => {
  const { requestMicrophone } = useMicrophoneContext();

  return (
    <Center h="100dvh" w="100dvw" bg="gray.100" overflow={"hidden"}>
      <Card>
        <CardBody>
          <Button onClick={requestMicrophone} colorScheme="purple" size={"lg"}>
            Start
          </Button>
        </CardBody>
      </Card>
    </Center>
  );
};
