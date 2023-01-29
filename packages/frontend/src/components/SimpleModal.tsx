import { Box, Button, Card, CardBody, CardHeader, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, StackDivider, useDisclosure, Text, Spinner } from "@chakra-ui/react"
import React, { useState } from "react"

export function SimpleModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState("")
  
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const handleSubmit = event => {
      event.preventDefault();
      setLoading(true)
      onClose()

      const message = "a bill proposal that addresses " + question1 + ". The intended outcome would be " + question2

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message })
      };
      
      try {
        fetch("api/BillDirection", requestOptions)
        .then((response) => response.json())
        .then((data) => setData(data[0].generated_text))
      } catch (error) {
        alert(error)
      }finally{
        setLoading(false)
      }
      
    };

    const [question1, setQuestion1] = useState('');
    const [question2, setQuestion2] = useState('');

    return (
      <>
            {loading && <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
              
            />}
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

        <Card>
          <CardHeader>
            <Heading size='md'>Client Report</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing='4'>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Summary
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {data.toString()}
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Overview
                </Heading>
                <Text pt='2' fontSize='sm'>
                  Check out the overview of your clients.
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Analysis
                </Heading>
                <Text pt='2' fontSize='sm'>
                  See a detailed analysis of all your business clients.
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </>
    )
  }