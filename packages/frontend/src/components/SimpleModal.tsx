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
  Center,
  ButtonGroup,
  IconButton,
  Tag,
  Avatar,
  CardFooter,
  Image,
  Container,
  Badge
} from "@chakra-ui/react";
import { stringify } from "querystring";
import React, { useEffect, useState } from "react";
import { HiOutlineClipboard } from "react-icons/hi";
import { LegislatorCard } from "./LegislatorCard";

export function SimpleModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [loading1, setLoading1] = useState(false)
    const [loading2, setLoading2] = useState(false)

    const [summary, setSummary] = useState(" ")
    const [proposal, setProposal] = useState(" ")
    const [classification, setClassification] = useState<{label: string, percentage: string}>({label: "None", percentage: " " })
    const [personInfo, setPersonInfo] = useState<any>({})
  
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const handleSubmit = event => {
      event.preventDefault();
      onClose()

      setSummary("")
      setProposal("")
      setClassification({label: "", percentage: ""})
      setPersonInfo({})

      const message = "a bill proposal that addresses " + question1 + ". The intended outcome would be " + question2

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message.toLowerCase() })
      };
      
      setLoading1(true)
      setLoading2(true)

      fetch("api/BillDirection", requestOptions)
        .then((response) => response.json())
        .then((data) => setSummary(data[0].generated_text))
        .catch((err) => {
          alert("BillDirection error: " + err)
        })
        .finally(() => setLoading1(false))

      fetch("api/getProposal", requestOptions)
        .then((response) => response.json())
        .then((data) => setProposal(data))
        .catch((err) => {
          alert("getProposal error: " + err)
        })
        .finally(() => setLoading2(false))

      fetch("api/billCassification", requestOptions)
        .then((response) => response.json())
        .then((data) => setClassification({label: data[0].label, percentage: Number(data[0].score).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2})}))
        .catch((err) => {
          alert("billClassification error: " + err)
        })

      fetch("api/getReleventPersonInfo", requestOptions)
        .then((response) => response.json())
        .then((data) => setPersonInfo(data))
        .catch((err) => {
          alert("getReleventPersonInfo error: " + err)
        })
        
    };

    const [question1, setQuestion1] = useState('');
    const [question2, setQuestion2] = useState('');

    return (
      <>
        <Button onClick={onOpen} color="green.400" margin={5}>Generate</Button>
  
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
                <FormLabel>What is the problem that you want to address?</FormLabel>
                <Input ref={initialRef} placeholder='question1' 
                onChange={event => setQuestion1(event.currentTarget.value)}/>
              </FormControl>
  
              <FormControl mt={4} isRequired>
                <FormLabel>What outcomes do you want to see?</FormLabel>
                <Input placeholder='question2' 
                onChange={event => setQuestion2(event.currentTarget.value)}/>
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                Generate
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Flex wrap={"wrap"} gridGap={5}>
          <Card width={600} height={"auto"}>
          {proposal ? <CardBody>
              <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                  <ButtonGroup>
                    <Heading size='sm' textTransform='uppercase'>
                      Bill Proposal
                    </Heading>
                    <IconButton size={"xs"} variant={"outline"} icon={<HiOutlineClipboard/>} aria-label="copy"/> 
                  </ButtonGroup>
                       
                  <Text pt='2' fontSize='sm' whiteSpace={"pre-wrap"}>
                    {proposal.toString()}
                  </Text>
                </Box>
              </Stack>
            </CardBody> : <><Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
                alignSelf={"auto"}
              /><Text>Proposal Loading...</Text></>}
          </Card>
          <Card width={600} height={200}>
            {summary ? <CardBody>
              <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    Summary
                  </Heading>
                  <Text pt='2' fontSize='sm' whiteSpace={"pre-wrap"}>
                    {summary.toString()}
                  </Text>
                </Box>
              </Stack>
            </CardBody> : <><Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
            alignSelf={"auto"}
          /><Text>Summary Loading...</Text></>}
          </Card>

        {classification.label ? (
          <Badge colorScheme={'green'} size={"lg"}>{classification.label + " " + classification.percentage}</Badge>
        ) : (
          <>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
              alignSelf={"auto"}
            />
            <Text>Classification Loading...</Text>
          </>
        )}

          {/* <Card width={600} height={200}>
            {summary ? <CardBody>
              <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    Summary
                  </Heading>
                  <Text pt='2' fontSize='sm' whiteSpace={"pre-wrap"}>
                    {summary.toString()}
                  </Text>
                </Box>
              </Stack>
            </CardBody> : <><Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
            alignSelf={"auto"}
          /><Text>Summary Loading...</Text></>}
          </Card> */}

        </Flex>
      </>
    )
  }