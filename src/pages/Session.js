import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import NoteCard from '../components/NoteCard';
import { Grid, HStack, GridItem } from '@chakra-ui/react';
const Session = () => {
  const param = useParams();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchSessionsFromAPI = async () => {
      const request = await fetch('/api/v1/note/' + param.id);
      const data = await request.json();
      console.log(data.message);
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
      <Navbar />
      {notes.length > 0 ? (
        <HStack spacing={5} margin={5}>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {notes.map((note, index) => {
              return (
                <GridItem key={index} w="100%" h="100%">
                  <NoteCard
                    key={index}
                    id={note.id}
                    username={note.user.username}
                    comments={note.comments}
                    note={note.message}
                  />
                </GridItem>
              );
            })}
          </Grid>
        </HStack>
      ) : (
        <div>Session</div>
      )}
    </>
  );
};

export default Session;
