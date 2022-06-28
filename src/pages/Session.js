import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NoteCard from '../components/NoteCard';
import { Grid, HStack, GridItem } from '@chakra-ui/react';
import NoSessions from '../components/NoSessions';
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
        <NoSessions />
      )}
    </>
  );
};

export default Session;
