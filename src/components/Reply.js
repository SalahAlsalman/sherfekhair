import React, { useState } from 'react';
import {
  FormLabel,
  Text,
  Textarea,
  Input,
  FormControl,
} from '@chakra-ui/react';

const Reply = ({}) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  return (
    <FormControl>
      <FormLabel htmlFor="title" mb="8px">
        Title:{' '}
      </FormLabel>
      <Input
        id="title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Enter title here"
        size="sm"
      />
      <FormLabel htmlFor="body" mb="8px">
        Body:
      </FormLabel>
      <Textarea
        id="body"
        value={body}
        onChange={e => setBody(e.target.value)}
        placeholder="Enter body here"
        size="sm"
      />
    </FormControl>
  );
};

export default Reply;
