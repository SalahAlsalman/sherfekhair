import {
  Heading,
  Box,
  Center,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { VStack } from '@chakra-ui/react';
import React from 'react';

const Comment = ({ message, messageDate, username }) => {
  return (
    <Center py={3}>
      <Box
        maxW={'320px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
      >
        <VStack>
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            Title
          </Heading>

          <Text>{/\d{4}-\d{2}-\d{2}/.exec(messageDate)[0]}</Text>
          <Text fontWeight={600} color={'gray.500'} mb={4}>
            @{username}
          </Text>
          <Text
            textAlign={'center'}
            color={useColorModeValue('gray.700', 'gray.400')}
            px={3}
          >
            {message}
          </Text>
        </VStack>

        <Stack mt={8} direction={'row'} spacing={4}>
          
          <Button
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
            Reply
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default Comment;
