import {Flex, Box, Divider} from '@chakra-ui/react';
import Image from 'next/image';
import DummyImage from '../../images/estate-icon.png';

const PlaceholderCard = () => {
    return(
        <Flex flexWrap='wrap' w='350px'  paddingTop='0px' justifyContent='flex-start' 
        cursor='pointer' border='1px' rounded='lg' borderColor='gray.200' m={[0,3,3]}
        boxShadow='base'>
        <Box overflow='hidden' width={350} height={200} borderTopRadius='lg'>
            <Image src={DummyImage} width={350} height={200}  
            alt="Placeholder Property Pic " />
        </Box>
        <Divider h='15' w='60%' backgroundColor='#E3E3E3' marginBottom='3'/>
        <Divider h='15' w='100%'backgroundColor='#E3E3E3' marginBottom='2'/>
        <Divider h='15' w='100%'backgroundColor='#E3E3E3' marginBottom='2'/>
        </Flex>
    );
}

export default PlaceholderCard;