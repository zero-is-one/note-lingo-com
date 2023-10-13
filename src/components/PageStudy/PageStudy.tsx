import {
  Center,
  Card,
  Stack,
  CardBody,
  Button,
  VStack,
} from "@chakra-ui/react";
import { AiFillSound } from "react-icons/ai";
import { BsMusicNoteList, BsFillFileEarmarkMusicFill } from "react-icons/bs";
import { TbTextSpellcheck } from "react-icons/tb";
import { Link as ReactRouterLink } from "react-router-dom";

export const PageStudy = () => {
  return (
    <Center h="100dvh" w="100dvw" bg="gray.100">
      <Stack>
        <Card>
          <CardBody>
            <VStack>
              <Button
                to="/study/practice/sheet-notation"
                colorScheme="red"
                as={ReactRouterLink}
                w={"100%"}
                size={"lg"}
                leftIcon={<BsFillFileEarmarkMusicFill />}
              >
                Practice Sheet Music
              </Button>
              <Button
                to="/study/practice/note-name"
                colorScheme="orange"
                as={ReactRouterLink}
                w={"100%"}
                size={"lg"}
                leftIcon={<TbTextSpellcheck />}
              >
                Practice Note Name
              </Button>
              <Button
                to="/study/practice/sound"
                colorScheme="blue"
                as={ReactRouterLink}
                w={"100%"}
                size={"lg"}
                leftIcon={<AiFillSound />}
              >
                Practice Sounds
              </Button>
              <Button
                to="/study/practice/coover-notation"
                colorScheme="purple"
                as={ReactRouterLink}
                w={"100%"}
                size={"lg"}
                leftIcon={<BsMusicNoteList />}
              >
                Practice Coover Notation
              </Button>
            </VStack>
          </CardBody>
        </Card>
      </Stack>
    </Center>
  );
};
