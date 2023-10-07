import {
  Center,
  Card,
  Stack,
  Box,
  CardBody,
  Select,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";

import { GameOptions, Genre } from "./types";
import { useMicrophoneContext } from "@/hooks/useMicrophoneContext";

export const StartScreen = ({
  gameOptions,
  setGameOptions,
}: {
  gameOptions: GameOptions;
  setGameOptions: (options: GameOptions) => void;
}) => {
  const { requestMicrophone } = useMicrophoneContext();

  return (
    <Center h="100dvh" w="100dvw" bg="gray.100">
      <Card minWidth={300}>
        <CardBody>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack spacing="4">
              <FormControl>
                <FormLabel>Card Types</FormLabel>
                <Select
                  value={gameOptions.genre}
                  size="lg"
                  onChange={(e) => {
                    setGameOptions({
                      ...gameOptions,
                      genre: e.target.value as Genre,
                    });
                  }}
                >
                  {["sound", "name", "notation"].map((value) => (
                    <option key={value} value={value}>
                      {value.charAt(0).toUpperCase() + value.slice(1)}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <Box>
                <Button
                  colorScheme="purple"
                  variant="solid"
                  size={"lg"}
                  w={"100%"}
                  onClick={async () => {
                    await requestMicrophone();
                    setGameOptions({
                      ...gameOptions,
                      startTime: new Date().getTime(),
                    });
                  }}
                >
                  Start Session
                </Button>
              </Box>
            </Stack>
          </form>
        </CardBody>
      </Card>
    </Center>
  );
};
