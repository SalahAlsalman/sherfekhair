import { React, useEffect, useRef, useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Select,
  useDisclosure,
} from '@chakra-ui/react';

const AddClassModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState();
  const classChoosen = useRef();
  const finalRef = useRef(null);
  useEffect(() => {
    const fetchClassFromAPI = async () => {
      try {
        const request = await fetch('/api/v1/class');
        const data = await request.json();
        if (data) {
          setClasses(data.message);
          return;
        } else {
          //error no classes found
        }
      } catch (error) {
        console.log(error);
        //error something
      }
    };

    fetchClassFromAPI();
  }, []);

  const onClickaddClass = async () => {
    try {
      const request = await fetch(
        '/api/v1/class/addUserToClass/' + classChoosen.current.value,
        {
          headers: {
            'content-type': 'application/json',
          },
          method: 'POST',
        }
      );
      const data = await request.json();
      if (request.status === 200) {
        window.location.reload(false);
      } else {
        return setError('You Already have this class!');
      }
    } catch (error) {
      return setError('Error with server');
    }
  };

  return (
    <>
      <Button colorScheme="teal" size="lg" mt={4} onClick={onOpen}>
        Add Class
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(6px) hue-rotate(20deg)"/>
        <ModalContent>
          <ModalHeader>Add Class</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select
              ref={classChoosen}
              size="lg"
              variant="filled"
              placeholder="Choose Class"
            >
              {classes && (
                <>
                  {classes.map((myclass, index) => {
                    return (
                      <option key={index} value={myclass.id}>
                        {myclass.name}
                      </option>
                    );
                  })}
                </>
              )}
            </Select>
            {error && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>Class:</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClickaddClass}>
              Add
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddClassModal;
