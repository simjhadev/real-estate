import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import LandingPgPic from '@/images/LandingPgPic.jpg';

import { Flex, Box, Text, Center, Divider, Spacer } from '@chakra-ui/react';
import PropertySearch from '@/components/PropertySearch/PropertySearch';
import PropertySearchOptions from '@/components/PropertySearch/PropertySearchOptions';
import PropertyList from '@/components/PropertySearchResult/PropertyList';


/* export const Banner = ({ purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl }) => (
  <Flex flexWrap='wrap' justifyContent='center' alignItems='center' m='10'>
    <Image src={imageUrl} width={500} height={300} alt="Property Pic" />
    <Box p='5'>
      <Text color='gray.500' fontSize='sm' fontWeight='medium'>{purpose}</Text>
      <Text fontSize='3xl' fontWeight='bold'>{title1}<br />{title2}</Text>
      <Text fontSize='lg' paddingTop='3' paddingBottom='3' color='gray.700'>{desc1}<br />{desc2}</Text>
      <Button fontSize='xl'>
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
); */
const imgURL = `url(${LandingPgPic.src})`;

export default function Home() {
  //const [searchType, setSearchType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchOption, setSearchOption] = useState("sale");
  const [searchParams, setSearchParams] = useState({
    searchOption: searchOption,
    searchLocation: searchValue.trim()
  });

  const searchClickHandler = () => {
    console.log("Search Clicked");
    setSearchParams({
      searchOption: searchOption,
      searchLocation: searchValue.trim()
    })
  }

  return (
    
    <Box>
      
      <Box bgImage={imgURL}
            bgPosition="center top" bgSize="cover"
            bgRepeat="no-repeat" h="60vh"
            >
              <Center h='100%' w='100%'>
              <Flex direction='column' shrink='1' align='center' bg='white' p='2' rounded='md' 
                  w={{ base: '90%', sm: '80%', md: '60%' }}>
                <PropertySearch value={searchValue} onSearchClick={searchClickHandler} onChange={setSearchValue}/>
                <PropertySearchOptions onOptionClick={setSearchOption} />
              </Flex> 
              </Center>  
      </Box>

      <Text fontSize={['xl','xl','2xl']} pt={20} fontWeight='medium' color="blue.500">Home For You</Text>
      <Text fontSize={['xs','md','lg']}  pb={2} color="gray.500">Based on your search</Text>
      <Divider />
      <Box w='100%' pt={10}>
        <PropertyList searchParams={searchParams} changeSearchParams={setSearchParams}  />
      </Box>
      
      
      
    </Box>
    
  )
}
