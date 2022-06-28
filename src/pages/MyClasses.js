import { Grid, GridItem, HStack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ClassCard from '../components/ClassCard';
import Navbar from '../components/Navbar';
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
      <Navbar />
      {myclasses.length > 0 ? (
        <HStack spacing={5} margin={5}>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
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
    </>
  );
};

export default MyClasses;
