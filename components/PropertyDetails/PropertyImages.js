import { useState, useEffect } from 'react';
import { SimpleGrid, Center, Box } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react'
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";
import { useMediaQuery } from '@chakra-ui/react'
//import Image from 'next/image';
import { Image } from '@chakra-ui/react';

import dummyImage from '../../images/estate-icon.png';


const PropertyImages = ({propertyDtls, onImageClick, gridCWidth}) => {
    const [disablePrevBtn, setDisablePrevBtn] = useState(true);
    const [disableNextBtn, setDisableNextBtn] = useState(true);
    const [picsCount, setPicsCount] = useState(1);
    const [gridWidthForMob, setGridWidthForMob] = useState(gridCWidth);
    const [currentPicIndex, setCurrentPicIndex] = useState(0);
    const [picSlidePos, setPicSlidePos] = useState(0);
    const [mobSize] = useMediaQuery('(max-width: 48em)');

    const { photos } = {... propertyDtls};
    const defaultImage = "https://ap.rdcpix.com/9e6c24a10028e42651d866306062a3e8l-m3734405187x.jpg";
    //console.log(gridCWidth);

    /*let picsCount, gridWidth;
    if(photos?.length > 0 )
    {
        picsCount = photos.length;
        gridWidth = photos.length * gridCWidth;
    }else{
        picsCount = 1;
        gridWidth = gridCWidth;
    }
*/
    useEffect(()=>{
        console.log(picsCount);
        if(photos?.length > 0 )
        {
            setPicsCount(photos.length);
            setGridWidthForMob(photos.length * gridCWidth);
        }
    },[propertyDtls]);

    useEffect(()=>{
        
        if(picsCount > 1){
            setDisablePrevBtn((currentPicIndex <= 0) ? true : false);
            setDisableNextBtn((currentPicIndex < (picsCount - 1)) ? false : true);
            setPicSlidePos(-(currentPicIndex * gridCWidth));
        }   

    },[currentPicIndex, picsCount]);

    const prevClickHandler = () => {
        if(!disablePrevBtn){
            setCurrentPicIndex((index) => index - 1);
        }
    };

    const nextClickHandler = () => {
        if(!disableNextBtn){
            setCurrentPicIndex((index) => index + 1);
        }
    };

    
    //console.log({picSlidePos});
    return(
            <Box pos="relative" w='gridCWidth' overflow="hidden">
            <Center pos="relative" w={{base: gridWidthForMob, md: '100%', lg: '100%', xl: '100%'}} 
            left={{ base: picSlidePos, md: '0px', lg: '0px' }} 
            transition=" left 0.5s ease-out"
            spacing={1}>
            
            <SimpleGrid columns={{base: picsCount, md: 1, lg: 2, xl: 2}} >
                {photos ? photos.map((photo,i)=>(
                <Box overflow='hidden' width={{base: gridCWidth, md: 'auto', lg: 'auto'}} 
                height={{base: gridCWidth, md: 'auto', lg: 'auto'}} key={'p'+i} 
                style={{position: 'relative'}} onClick={()=> onImageClick(i)}>
                <Image src={photo ? photo : defaultImage} boxSize={{base: gridCWidth, md: 'auto', lg: 'auto'}} 
                objectFit='cover' alt="Property Pics" fallbackSrc={dummyImage.src}/>
                </Box>
                )): null}
            </SimpleGrid>
            
            </Center>
            {mobSize ? 
                <>
                <IconButton variant={disablePrevBtn ? 'disabledNextPrevButtonIcon' :'nextPrevButtonIcon'} 
                size="xs"
                icon={<TfiArrowCircleLeft />} 
                pos="absolute" left='0' top={(gridCWidth/2)} aria-label='Picture previous button'
                onClick={prevClickHandler} />

                <IconButton variant={disableNextBtn ? 'disabledNextPrevButtonIcon' :'nextPrevButtonIcon'} 
                size="xs"
                icon={<TfiArrowCircleRight />}
                pos="absolute" right='0' top={(gridCWidth/2)} aria-label='Picture next button' 
                onClick={nextClickHandler}/> 
                </>
            :null}
            </Box>
        
    );
};

export default PropertyImages;