import {
  Heading,
  Box,
  Center,
  Text,
  Stack,
  Button,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';
import { VStack } from '@chakra-ui/react';
import React from 'react';

const Comment = ({ message, messageDate, username }) => {
  return (
    <Center py={3}>
      <Box
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        p={6}
        textAlign={'center'}
      >
        <VStack>
          <HStack w="full" alignItems="center" spacing={4}>
            <Text
              fontWeight={600}
              color={useColorModeValue('gray.700', 'gray.400')}
              display={'flex'}
            >
              <Text textDecoration='underline' fontFamily="200" fontSize={'sm'} mr={3}>
                Posted by:
              </Text>
              @{username}
            </Text>
            <Text
              textDecoration="underline"
              fontSize={11}
              fontWeight={600}
              color={useColorModeValue('gray.700', 'gray.400')}
            >
              {/\d{4}-\d{2}-\d{2}/.exec(messageDate)[0]}
            </Text>
          </HStack>
          <Text
            textAlign={'center'}
            color={useColorModeValue('gray.700', 'gray.400')}
            px={3}
          >
            {message}
          </Text>
        </VStack>

        <Stack borderColor="white" mt={8} direction={'row'} spacing={4}>
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'blue.400'}
            maxW={'120px'}
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
            Like
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default Comment;
