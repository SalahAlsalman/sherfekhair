import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useToast,
  useColorModeValue,
  Link as ChakaraLink,
  Select,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { useState, useRef } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

export default function Signup() {
  const toast = useToast();
  const usernameRef = useRef();
  const roleRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if (
      usernameRef.current.value === '' ||
      passwordRef.current.value === '' ||
      emailRef.current.value === ''
    ) {
      return setError('please make sure all field are filled');
    }
    try {
      setError('');
      setIsLoading(true);
      const response = await signup(
        usernameRef.current.value.trim(),
        emailRef.current.value.trim(),
        passwordRef.current.value.trim(),
        roleRef.current.value.toLowerCase().trim()
      );
      if (response) {
        setIsLoading(false);
        toast({
          title: 'You have signed up successfully!',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        return navigate('/');
      } else {
        setIsLoading(false);
        return toast({
          title: 'Make sure your data are correct!',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.log('error: ' + error);
      return setError('failed to create account!');
    }
  };

  return (
    <>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="username" isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input ref={usernameRef} type="text" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="role">
                    <FormLabel>Role</FormLabel>
                    <Select ref={roleRef}>
                      <option>Student</option>
                      <option>Teacher</option>
                    </Select>
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input ref={emailRef} type="email" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    ref={passwordRef}
                    type={showPassword ? 'text' : 'password'}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword(showPassword => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                {isLoading ? (
                  <Button
                    isLoading
                    onClick={handleSubmit}
                    loadingText="Submitting"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                  />
                ) : (
                  <Button
                    onClick={handleSubmit}
                    loadingText="Submitting"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                  >
                    Sign up
                  </Button>
                )}
              </Stack>
              <Stack pt={6}>
                {error && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>Note:</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Text align={'center'}>
                  Already a user?{' '}
                  <ChakaraLink color={'blue.400'}>
                    <Link to="/login">Login</Link>
                  </ChakaraLink>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      <Footer/>
    </>
  );
}
