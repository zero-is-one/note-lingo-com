import {
  Center,
  Card,
  Stack,
  CardBody,
  Button,
  VStack,
} from "@chakra-ui/react";
import { HiMusicNote } from "react-icons/hi";
import { BsMusicNoteList } from "react-icons/bs";
import { Link as ReactRouterLink } from "react-router-dom";

export const PageStudy = () => {
  return (
    <Center h="100dvh" w="100dvw" bg="gray.100">
      <Stack>
        <Card minWidth={400}>
          <CardBody>
            <VStack>
              <Button
                to="/study/practice/note"
                colorScheme="orange"
                as={ReactRouterLink}
                w={"100%"}
                size={"lg"}
                leftIcon={<HiMusicNote />}
              >
                Pracice Notes
              </Button>
              <Button
                to="/study/practice/coover-notation"
                colorScheme="purple"
                as={ReactRouterLink}
                w={"100%"}
                size={"lg"}
                leftIcon={<BsMusicNoteList />}
              >
                Practive Coover Notation
              </Button>
            </VStack>
          </CardBody>
        </Card>
      </Stack>
    </Center>
  );
};
