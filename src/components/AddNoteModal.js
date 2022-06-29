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
  useColorModeValue,
  AlertDescription,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Textarea,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

const AddNoteModal = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logout } = useAuth();
  const [error, setError] = useState();
  const param = useParams();
  const session_id = param.id;
  const finalRef = useRef(null);
  const titleRef = useRef();
  const bodyRef = useRef();
  const [role, setrole] = useState(localStorage.getItem('role'));

  const onClickaddClass = async () => {
    try {
      const request = await fetch('/api/v1/note', {
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          title: titleRef.current.value,
          body: bodyRef.current.value,
          session_id,
        }),
      });

      const data = await request.json();
      if (request.status === 200) {
        window.location.reload(false);
      } else {
        setError('You are not registered to this class to add notes!');
        logout();
        return navigate('/login');
      }
    } catch (error) {
      console.log(error);
      return setError('Error with server');
    }
  };

  return (
    <>
      {(role === 'teacher' || role === 'student') && (
        <Button colorScheme="teal" size="lg" mt={4} onClick={onOpen}>
          Add Note
        </Button>
      )}
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            bg={useColorModeValue('gray.100', 'blackAlpha.400')}
            py={5}
          >
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input my={3} ref={titleRef} placeholder="Title" />
            </FormControl>
            <FormControl>
              <FormLabel>body</FormLabel>
              <Textarea my={3} ref={bodyRef} placeholder="your note" />
            </FormControl>
            {error && (
              <Alert status="error" mt={5} borderRadius={5}>
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

export default AddNoteModal;
