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

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      style={{
        position: 'relative',
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
        <Image width="64px" height="64px" src={Logo} alt={'Logo'} />
        <Text>
          &copy; {new Date().getFullYear()} Made with ❤ Salah Al-Salman
        </Text>
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
