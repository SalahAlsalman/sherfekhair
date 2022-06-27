import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link as ChakaraLink,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, currentUser } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const loginButtonClick = async () => {
    if (usernameRef.current.value === '' || passwordRef.current.value === '') {
      return setError('please make sure all field are filled');
    }

    try {
      setError('');
      setIsLoading(true);
      const response = await login(
        usernameRef.current.value,
        passwordRef.current.value
      );

      if (response) {
        setIsLoading(false);
        return navigate('/');
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      return setError('failed to login!');
    }
  };

  return (
    <>
      <Navbar />
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool{' '}
              <ChakaraLink color={'blue.400'}>features</ChakaraLink> ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input ref={usernameRef} type="text" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input ref={passwordRef} type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox>Remember me</Checkbox>
                  <ChakaraLink href="/forgotpassword" color={'blue.400'}>
                    Forgot password?
                  </ChakaraLink>
                </Stack>
                {isLoading ? (
                  <Button
                    onClick={loginButtonClick}
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                  />
                ) : (
                  <Button
                    onClick={loginButtonClick}
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                  >
                    Sign in
                  </Button>
                )}
                {error && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>Note:</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
