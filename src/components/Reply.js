import React from 'react';
import {
  FormLabel,
  Box,
  useColorModeValue,
  Textarea,
  
  FormControl,
} from '@chakra-ui/react';

const Reply = ({message,setMessage}) => {
  


  return (
    <Box
      bg={useColorModeValue('gray.100', 'blackAlpha.400')}
      borderRadius={10}
      mx={3}
      mt={3}
      borderColor="white"
      borderTop={4}
      p={6}
    >
      <FormControl>
        
        <FormLabel htmlFor="message" mb="8px">
          Message:
        </FormLabel>
        <Textarea
        my={3}
          id="message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Enter message here"
          size="sm"
          borderRadius={10}
          rows={5}
          resize='none'
        />
      </FormControl>
    </Box>
  );
};

export default Reply;
