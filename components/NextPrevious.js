import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { IoChevronBackCircleSharp, IoChevronForwardCircleSharp } from 'react-icons/io5';
import { Center, Spacer, Flex } from '@chakra-ui/react';
import { createQueryParams } from './PropertyFilterSearch/utilityFunctionsForFilterSearch';

const NextPrevious = ({totalProperties, offset, propertyStatus, location, bdmin, bdmax, pmax, pmin, limit}) => {

    const currentOffset = parseInt(offset);
    const pLimit = parseInt(limit);
    const [ disablePrev, setDisablePrev ] = useState(((currentOffset - pLimit) < 0) ? true : false);
    const [ disableNext, setDisableNext ] = useState(((currentOffset + pLimit) > totalProperties) ? true : false);
    
    
    const router = useRouter();
    //console.log(currentOffset, pLimit, (currentOffset - pLimit));
    //console.log(disablePrev, disableNext);

    useEffect(() => {
            
        if( (currentOffset + pLimit) > totalProperties ){
          setDisableNext(true);
        }
        else{
          setDisableNext(false);
        }

        if( (currentOffset - pLimit) < 0 ){
          setDisablePrev(true);
        }
        else{
          setDisablePrev(false);
        } 
        
      
      
    },[router.query.offset]);



    const prevClickHandler = (e) => {
      
      if(disablePrev === false){
        const prevOffset = currentOffset - pLimit;
        if( prevOffset >= 0 ){
          console.log("Prev Click handler");
          router.push({
            pathname: '/search',
            query: createQueryParams(propertyStatus, prevOffset, location, bdmin, bdmax, pmax, pmin)
          })
        }
      }
    }

    const nextClickHandler = (e) => {
     
      if(disableNext === false){
        const nextOffset = currentOffset + pLimit;
        console.log("Next Click handler");
        router.push({
          pathname: '/search',
          query: createQueryParams(propertyStatus, nextOffset, location, bdmin, bdmax, pmax, pmin)
        })
      }
    }

    
    return(
        <Center>
          <Flex w='10%'>

            <IoChevronBackCircleSharp size='30px' 
            style ={ disablePrev ? {color : '#d3d3d3'} : {color : '#54a2d2'}} 
            cursor='pointer'
            onClick={prevClickHandler} 
            />
           
            <Spacer />

            <IoChevronForwardCircleSharp size='30px' 
            style ={ disableNext ? {color : '#d3d3d3'} : {color : '#54a2d2'}} 
            cursor='pointer' 
            onClick={nextClickHandler}/>

          </Flex>
        </Center>
    );
}

export default NextPrevious;