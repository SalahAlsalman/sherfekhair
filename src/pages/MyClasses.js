import { Box, Container, Grid, GridItem, HStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import AddClassModal from '../components/AddClassModal';
import ClassCard from '../components/ClassCard';
import Footer from '../components/Footer';
import NoClasses from '../components/NoClasses';

const MyClasses = () => {
  const [myclasses, setMyClasses] = useState([]);
  useEffect(() => {
    const fetchMyClasses = async () => {
      const request = await fetch('/api/v1/class/myclasses', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await request.json();
      if (request.status === 200) {
        setMyClasses(data.message);
      }
    };
    try {
      fetchMyClasses();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Box marginX={5}>
        <AddClassModal />
      </Box>
      {myclasses.length > 0 ? (
        <HStack spacing={5} marginX={5}>
          <Grid templateColumns={["repeat(1, 1fr)","repeat(2, 1fr)","repeat(3, 1fr)","repeat(4, 1fr)","repeat(5, 1fr)"]} justifyContent='space-between' gap={6}>
            {myclasses.map((myClass, index) => {
              return (
                <GridItem key={index} w="100%" h="100%">
                  <ClassCard key={index} id={myClass.id} name={myClass.name} />
                </GridItem>
              );
            })}
          </Grid>
        </HStack>
      ) : (
        <NoClasses />
      )}
      <Footer />
    </>
  );
};

export default MyClasses;
