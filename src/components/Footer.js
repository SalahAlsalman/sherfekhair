import {
  Box,
  chakra,
  Container,
  Link,
  Stack,
  Image,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Flex,
} from '@chakra-ui/react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { ReactNode } from 'react';

import Logo from '../img/Logo.png';

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer({ pos }) {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      style={{
        position: pos ? pos : 'relative',
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 1030,
      }}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Image
          display={{ base: 'none', md: 'inline-flex' }}
          width="64px"
          height="64px"
          src={Logo}
          alt={'Logo'}
        />
        <Flex>
          <Text fontSize="10px" alignSelf="center">&copy; {new Date().getFullYear()} </Text>
          <Text ml={2}> Made with ♥ Salah Al-Salman</Text>
        </Flex>

        <Stack direction={'row'} spacing={6}>
          <SocialButton
            label={'LinkedIn'}
            href={'https://www.linkedin.com/in/s-alsalman/'}
          >
            <FaLinkedin />
          </SocialButton>
          <SocialButton
            label={'Github'}
            href={'https://github.com/iisalahabdulla'}
          >
            <FaGithub />
          </SocialButton>
          <SocialButton label={'Twitter'} href={'https://twitter.com/ii_salah'}>
            <FaTwitter />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
