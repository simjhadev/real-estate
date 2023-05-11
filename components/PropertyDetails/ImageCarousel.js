import { useState, useEffect } from 'react';
import {Center, Box, Grid, GridItem, useMediaQuery} from '@chakra-ui/react';
import { IoChevronBackCircleSharp, IoChevronForwardCircleSharp } from 'react-icons/io5';
//import Image from 'next/image';
import { Image } from '@chakra-ui/react';

const ImageCarousel = ({propertyDtls, selectedPicIndex}) => {
    const { photos } = {... propertyDtls};
    const totalCount = photos.length;
    const [disablePrev, setDisablePrev] = useState(true);
    const [disableNext, setDisableNext] = useState(true);
    const [currentPicIndex, setCurrentPicIndex] = useState(selectedPicIndex);
    const [currentPic, setCurrentPic] = useState(photos[selectedPicIndex]);
    const [touchEnabledDevice, setTouchEnabledDevice] = useState(false);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [mobSize] = useMediaQuery('(max-width: 48em)');

    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 50

    useEffect(()=>{
        setTouchEnabledDevice(is_touch_enabled());
    },[]);

    useEffect(()=>{
        if(totalCount > 1){
            setDisablePrev((currentPicIndex <= 0) ? true : false);
            setDisableNext((currentPicIndex < (totalCount - 1)) ? false : true);
            setCurrentPic(photos[currentPicIndex]);
        }   
    },[currentPicIndex]);

    const onTouchStart = (e) => {
        setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX)
    };
      
    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)
      
    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        //if (isLeftSwipe || isRightSwipe) console.log('swipe', isLeftSwipe ? 'left' : 'right')
        if(isLeftSwipe){
            nextClickHandler();
        }
        if(isRightSwipe){
            prevClickHandler();
        }
        // add your conditional logic here
    }

    const prevClickHandler = () => {
        if(!disablePrev){
            setCurrentPicIndex((index) => index - 1);
        }
     };

    const nextClickHandler = () => {
        if(!disableNext){
            setCurrentPicIndex((index) => index + 1);
        }
    };

    function is_touch_enabled() {
        return ( 'ontouchstart' in window ) ||
            ( navigator.maxTouchPoints > 0 ) ||
            ( navigator.msMaxTouchPoints > 0 );
    };
    
    //console.log(touchEnabledDevice);

    return(
        <Center pos="relative" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} pt='10'>
            <Grid templateColumns={mobSize ? '1fr' : '30px 1fr 30px'} alignItems='center'>
                {!mobSize ? 
                <GridItem>
                <IoChevronBackCircleSharp size='30px' 
                    style ={ disablePrev ? {color : '#d3d3d3'} : {color : '#54a2d2'}} 
                    cursor='pointer'
                    onClick={prevClickHandler} 
                />
                </GridItem>
                : null}

                <GridItem>
                <Box overflow='hidden' width={{base:'100%', md:'100%', lg:'700'}} 
                    maxHeight={{base:'100%', md:'100%', lg:'600'}} borderWidth={1}
                    style={{position: 'relative'}}>
                <Image src={currentPic} 
                    boxSize={{base:'100%', md:'100%', lg:'700'}} 
                    objectFit='fill'
                    alt="Property Pics" />
                </Box>
                </GridItem>

                {!mobSize ? 
                <GridItem>
                <IoChevronForwardCircleSharp size='30px' 
                    style ={ disableNext ? {color : '#d3d3d3'} : {color : '#54a2d2'}}                     
                    cursor='pointer' 
                    onClick={nextClickHandler}/>
                </GridItem>
                : null}
            </Grid>
            
            
        </Center>
            
            
        
        
    );
}

export default ImageCarousel;