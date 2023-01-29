import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  StackDivider,
  useDisclosure,
  Text,
  Spinner,
  Flex,
  Spacer,
  Link,
  Center,
  ButtonGroup,
  IconButton,
  Tag,
  Avatar,
  CardFooter,
  Image,
  Container,
  Badge,
  Grid,
} from "@chakra-ui/react";
import { ST } from "next/dist/shared/lib/utils";
import { stringify } from "querystring";
import React, { useEffect, useState } from "react";
import { HiOutlineClipboard } from "react-icons/hi";
import { LegislatorArea } from "./LegislatorArea";
import { LegislatorCard } from "./LegislatorCard";

export function SimpleModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const [summary, setSummary] = useState(" ");
  const [proposal, setProposal] = useState(" ");
  const [classification, setClassification] = useState<{
    label: string;
    percentage: string;
  }>({ label: "None", percentage: " " });
  const [personInfo, setPersonInfo] = useState<any>();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    onClose();

    setSummary("");
    setProposal("");
    setClassification({ label: "", percentage: "" });

    const message =
      "a bill proposal that addresses " +
      question1 +
      ". The intended outcome would be " +
      question2 +
      ". Give 3 steps to get this bill proposed";

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message.toLowerCase() }),
    };

    setLoading1(true);
    setLoading2(true);

    fetch("api/BillDirection", requestOptions)
      .then((response) => response.json())
      .then((data) => setSummary(data[0].generated_text))
      .catch((err) => {
        alert("BillDirection error: " + err);
      })
      .finally(() => setLoading1(false));

    fetch("api/getProposal", requestOptions)
      .then((response) => response.json())
      .then((data) => setProposal(data))
      .catch((err) => {
        alert("getProposal error: " + err);
      })
      .finally(() => setLoading2(false));

    fetch("api/billCassification", requestOptions)
      .then((response) => response.json())
      .then((data) =>
        setClassification({
          label: data[0].label,
          percentage: Number(data[0].score).toLocaleString(undefined, {
            style: "percent",
            minimumFractionDigits: 2,
          }),
        })
      )
      .catch((err) => {
        alert("billClassification error: " + err);
      });
  };

  const getPerson = (event) => {
    event.preventDefault();

    fetch("api/getReleventPersonInfo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: classification.label }),
    })
      .then((response) => response.json())
      .then((data) => setPersonInfo(data))
      .catch((err) => {
        alert("getReleventPersonInfo error: " + err);
      });
  };

  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");

  return (
    <>
      <Box>
        <Button
          variant="solid"
          onClick={onOpen}
          color="black"
          colorScheme='cyan'
          margin={5}
        >
          Generate
        </Button>
      </Box>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>First, answer some questions</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>
                What is the problem that you want to address?
              </FormLabel>
              <Input
                ref={initialRef}
                placeholder="question1"
                onChange={(event) => setQuestion1(event.currentTarget.value)}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>What outcomes do you want to see?</FormLabel>
              <Input
                placeholder="question2"
                onChange={(event) => setQuestion2(event.currentTarget.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="outline"
              colorScheme="blue"
              mr={3}
              onClick={handleSubmit}
            >
              Generate
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Flex wrap={"wrap"} gridGap={5}>
        <Card width={600} height={"auto"}>
          {proposal ? (
            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <ButtonGroup>
                    <Heading size="sm" textTransform="uppercase">
                      Bill Proposal
                    </Heading>
                    <IconButton
                      size={"xs"}
                      variant={"outline"}
                      icon={<HiOutlineClipboard />}
                      aria-label="copy"
                    />
                  </ButtonGroup>

                  <Text pt="2" fontSize="sm" whiteSpace={"pre-wrap"}>
                    {proposal.toString()}
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          ) : (
            <>
              <Box>
                <Center>
                  <Stack>
                    <Box></Box>
                    <Box></Box>
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="xl"
                      alignSelf={"auto"}
                    />
                    <Text>Proposal Loading...</Text>
                  </Stack>
                </Center>
              </Box>
            </>
          )}
        </Card>
        <Card width={600} height={240}>
          {summary ? (
            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Flex>
                    <Heading size="xs" textTransform="uppercase">
                      Summary
                    </Heading>
                    <Spacer></Spacer>
                    {classification.label ? (
                      <Box>
                        <Badge colorScheme={"green"} size={"lg"} height={5}>
                          {classification.label +
                            " " +
                            classification.percentage}
                        </Badge>
                        <Button onClick={getPerson} margin={3}>
                          Generate Relevant Contact
                        </Button>
                      </Box>
                    ) : (
                      <>
                        <Box>
                          <Center>
                            <Stack>
                              <Spinner
                                thickness="4px"
                                speed="0.65s"
                                emptyColor="gray.200"
                                color="blue.500"
                                size="xl"
                                alignSelf={"auto"}
                              />
                              <Text>Classification Loading...</Text>
                            </Stack>
                          </Center>
                        </Box>
                      </>
                    )}
                  </Flex>

                  <Text pt="2" fontSize="sm" whiteSpace={"pre-wrap"}>
                    {summary.toString()}
                  </Text>
                </Box>
                <Box></Box>
                <Box></Box>
                {personInfo?.results ? (
                  <Card maxW="md">
                    <CardHeader>
                      <Flex>
                        <Flex
                          flex="1"
                          gap="4"
                          alignItems="center"
                          flexWrap="wrap"
                        >
                          {/* <Avatar name={personInfo[0].first_name} src="https://bit.ly/sage-adebayo" /> */}

                          <Box>
                            <Flex>
                              <Stack>
                                <Heading size="md">
                                  Relevant legislator:{" "}
                                </Heading>
                                <Heading size="sm">
                                  {personInfo?.results[0].first_name}{" "}
                                  {personInfo?.results[0].last_name}
                                </Heading>
                              </Stack>
                            </Flex>
                            <Text>{personInfo?.results[0].roles[0].title}</Text>
                          </Box>
                        </Flex>
                        <IconButton
                          variant="ghost"
                          colorScheme="gray"
                          aria-label="See menu"
                        />
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <Text>
                        office: {personInfo?.results[0].roles[0].office}
                      </Text>
                      <Text>
                        Phone: {personInfo?.results[0].roles[0].phone}
                      </Text>
                      <Link
                        href={personInfo?.results[0].roles[0].contact_form}
                        isExternal
                      >
                        Contact Form:{" "}
                        {personInfo?.results[0].roles[0].contact_form}
                      </Link>
                      <Text>
                        office: {personInfo?.results[0].roles[0].office}
                      </Text>
                      <Text>committees:</Text>
                      {personInfo?.results[0].committees?.map((item, i) => (
                        <Text key={i}>
                          {personInfo?.results[0].committees[i].name}
                        </Text>
                      ))}
                    </CardBody>

                    <CardFooter
                      justify="space-between"
                      flexWrap="wrap"
                      sx={{
                        "& > button": {
                          minW: "136px",
                        },
                      }}
                    >
                      
                    </CardFooter>
                  </Card>
                ) : (
                  <></>
                )}
              </Stack>
            </CardBody>
          ) : (
            <>
              <Box>
                <Center>
                  <Stack>
                    <Box></Box>
                    <Box></Box>
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="xl"
                      alignSelf={"auto"}
                    />
                    <Text>Summary Loading...</Text>
                  </Stack>
                </Center>
              </Box>
            </>
          )}
        </Card>
      </Flex>
    </>
  );
}
