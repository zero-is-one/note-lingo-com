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

import { useGameState, Genre } from "./useGameState";

type GameStateType = ReturnType<typeof useGameState>;

export const Settings = ({
  gameState,
  onStart,
}: {
  gameState: GameStateType;
  onStart: () => void;
}) => {
  return (
    <Center h="100dvh" w="100dvw" bg="gray.100">
      <Card minWidth={400}>
        <CardBody>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack spacing="4">
              <FormControl>
                <FormLabel>Card Types</FormLabel>
                <Select
                  value={gameState.genre}
                  size="lg"
                  onChange={(e) => {
                    gameState.setGenre(e.target.value as Genre);
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
                  onClick={() => {
                    //gameState.reset();
                    onStart();
                  }}
                >
                  Start
                </Button>
              </Box>
            </Stack>
          </form>
        </CardBody>
      </Card>
    </Center>
  );
};
