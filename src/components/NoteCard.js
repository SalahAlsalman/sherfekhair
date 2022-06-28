import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
} from '@chakra-ui/react';
import ClassImage from '../img/classImage.jpg';
import { useNavigate } from 'react-router-dom';
import Comment from './Comment';

export default function NoteCard({ id, note, username, comments }) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Center py={6}>
        <Box
          minWidth={'250px'}
          maxW={'320px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}
        >
          <Avatar
            size={'xl'}
            src={ClassImage}
            alt={'Avatar Alt'}
            mb={4}
            pos={'relative'}
            _after={{
              content: '""',
              w: 4,
              h: 4,
              bg: 'green.300',
              border: '2px solid white',
              rounded: 'full',
              pos: 'absolute',
              bottom: 0,
              right: 3,
            }}
          />
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            Note: {id}
          </Heading>
          <Text fontWeight={600} color={'gray.500'} mb={4}>
            @{username}
          </Text>
          <Text
            textAlign={'center'}
            color={useColorModeValue('gray.700', 'gray.400')}
            px={3}
          >
            {note}
          </Text>

          <Stack mt={8} direction={'row'} spacing={4}>
            <Button
              onClick={onOpen}
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              bg={'blue.400'}
              color={'white'}
              boxShadow={
                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
              }
              _hover={{
                bg: 'blue.500',
              }}
              _focus={{
                bg: 'blue.500',
              }}
            >
              Open
            </Button>
          </Stack>
        </Box>
      </Center>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(6px) hue-rotate(20deg)"
        />
        <ModalContent>
          <ModalHeader >Title: {note}</ModalHeader>
          <ModalCloseButton />
          <ModalBody px={0} pt={0} pb={6}>
            <HStack  spacing={2} height={note.length * 5} >
              <Text m={5}>Body: {note}</Text>
            </HStack>
            {comments.length > 0 ? (
              comments.map((comment, index) => {
                return (
                  <Comment
                    key={index}
                    message={comment.message}
                    messageDate={comment.messageDate}
                    username={comment.user.username}
                  />
                );
              })
            ) : (
              <></>
            )}
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
