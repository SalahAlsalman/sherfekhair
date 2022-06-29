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
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

const AddSessionModal = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [classes, setClasses] = useState([]);
  const { logout } = useAuth();
  const [error, setError] = useState();
  const param = useParams();
  const classChoosen = param.id
  const finalRef = useRef(null);
  const [role, setrole] = useState(localStorage.getItem('role'));

  const onClickaddClass = async () => {
    try {
      const request = await fetch('/api/v1/session', {
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ class_id: classChoosen }),
      });

      const data = await request.json();
      console.log(data);
      if (request.status === 201) {
        window.location.reload(false);
      } else {
        setError("You don't have authority to add sessions!");
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
      {role === 'teacher' && (
        <Button colorScheme="teal" size="lg" mt={4} onClick={onOpen}>
          Add New Session
        </Button>
      )}
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Class</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Confirm</Text>
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

export default AddSessionModal;
