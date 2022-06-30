import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NoteCard from '../components/NoteCard';
import { Grid, HStack, GridItem, Box } from '@chakra-ui/react';

import NoNotes from '../components/NoNotes';
import AddNoteModal from '../components/AddNoteModal';
import Footer from '../components/Footer';
const Session = () => {
  const param = useParams();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchSessionsFromAPI = async () => {
      const request = await fetch('/api/v1/note/' + param.id);
      const data = await request.json();
      setNotes(data.message);
    };
    try {
      fetchSessionsFromAPI();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      <Box mx={5}>
        <AddNoteModal />
      </Box>
      {notes.length > 0 ? (
        <HStack spacing={5} margin={5}>
          <Grid
            templateColumns={[
              'repeat(1, 1fr)',
              'repeat(2, 1fr)',
              'repeat(3, 1fr)',
              'repeat(4, 1fr)',
              'repeat(5, 1fr)',
            ]}
            gap={6}
          >
            {notes.map((note, index) => {
              return (
                <GridItem key={index} w="100%" h="400px">
                  <NoteCard
                    key={index}
                    id={note.id}
                    username={note.user.username}
                    comments={note.comments}
                    title={note.title}
                    body={note.body}
                    messageDate={note.messageDate}
                  />
                </GridItem>
              );
            })}
          </Grid>
        </HStack>
      ) : (
        <NoNotes />
      )}
      <Footer pos={'fixed'}/>
    </>
  );
};

export default Session;
