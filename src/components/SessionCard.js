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
} from '@chakra-ui/react';
import ClassImage from '../img/classImage.jpg';
import { useNavigate } from 'react-router-dom';

export default function SessionCard({ index,id }) {
  const navigate = useNavigate();
  const onGoClick = () => {
    return navigate(`/session/${id}`);
  };
  return (
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
          Session: {index+1}
        </Heading>

        <Stack mt={8} direction={'row'} spacing={4}>
          <Button
            onClick={onGoClick}
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
            Go to session
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}
