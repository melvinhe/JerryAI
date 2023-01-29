import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import React, { useState } from "react"

export function SimpleModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const handleSubmit = event => {
      event.preventDefault();
      
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
      </>
    )
  }