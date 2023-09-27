import {
  Center,
  Card,
  Stack,
  Text,
  Box,
  Heading,
  StackDivider,
  Image,
  CardBody,
  Select,
  FormControl,
  FormHelperText,
  FormLabel,
  Button,
} from "@chakra-ui/react";

import logo from "@/assets/logo3.svg";

export const PageStart = () => {
  return (
    <Center h="100dvh" w="100dvw" bg="gray.100">
      <Stack>
        <Box
          w="100%"
          left={0}
          position={"absolute"}
          transform={"translateY(-100%)"}
          p={4}
          textAlign={"center"}
        >
          <Image
            src={logo}
            alt="Notelingo logo"
            height={"56px"}
            margin={"auto"}
          />
        </Box>

        <Card minWidth={400}>
          <CardBody>
            <Stack spacing="4">
              <FormControl>
                <FormLabel>Instrument</FormLabel>
                <Select defaultValue={"option1"} size="lg">
                  <option value="option1">Piano</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Input Method</FormLabel>
                <Select defaultValue={"option1"} size="lg">
                  <option value="option1">Keyboard Shortcutst</option>
                  <option value="option2">Midi</option>
                  <option value="option3">Option 3</option>
                </Select>
              </FormControl>
              <Box>
                <Button
                  colorScheme="purple"
                  variant="solid"
                  size={"lg"}
                  w={"100%"}
                >
                  Start
                </Button>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Stack>
    </Center>
  );
};
