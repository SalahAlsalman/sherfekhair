import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SessionCard from '../components/SessionCard';
import { HStack, Grid, GridItem, Button, Box } from '@chakra-ui/react';
import AddSessionModal from '../components/AddSessionModal';
import NoSessions from '../components/NoSessions';

const MyClass = () => {
  const param = useParams();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessionsFromAPI = async () => {
      const request = await fetch('/api/v1/session/' + param.id);
      const data = await request.json();
      setSessions(data.message);
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
        <AddSessionModal />
      </Box>
      {sessions.length > 0 ? (
        <HStack spacing={5} marginX={5}>
          <Grid
            templateColumns={["repeat(1, 1fr)","repeat(2, 1fr)","repeat(3, 1fr)","repeat(4, 1fr)","repeat(5, 1fr)"]}
            justifyContent='space-evenly'
            gap={6}
          >
            {sessions.map((session, index) => {
              return (
                <GridItem key={index} w="100%" h="100%">
                  <SessionCard key={index} id={session.id} />
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

export default MyClass;
