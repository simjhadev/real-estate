import { Flex, Box, Text, Spacer } from '@chakra-ui/react';
import { FaBed, FaBath } from 'react-icons/fa';
import DefaultImage from '../../images/DummyHouse.png';


import Image from 'next/image';

const PropertyInfoCard = ({propertyDtls , onPropertyClick}) => {
    //const defaultImage = "https://ap.rdcpix.com/9e6c24a10028e42651d866306062a3e8l-m3734405187x.jpg";
    const { property_id, coverPhoto, price, prop_type, beds, baths, sqft, address } = {... propertyDtls};

    return (
        <Flex flexWrap='wrap' w='350px'  paddingTop='0px' justifyContent='flex-start' 
        cursor='pointer' border='1px' rounded='lg' borderColor='gray.200' m={[0,3,3]}
        boxShadow='base' onClick={() => onPropertyClick(property_id)} >
            <Box overflow='hidden' width={350} height={200} borderTopRadius='lg'>
            <Image src={coverPhoto ? coverPhoto : DefaultImage} width={350} height={200}  
            alt="Property Pics" />
            </Box>
            <Box w='full' p={4}>
                {price ?
                    <Box>
                    <Text fontWeight='bold' fontSize='lg'>{price}</Text>
                    </Box>
                :null}
                
                {prop_type ?
                    <Box>{prop_type}</Box>
                :null}
                
                    
                <Flex alignItems='center' p='1'  w='300px' color='blue.400'>
                {beds ? <> {beds}&nbsp;<FaBed /> {" "}&nbsp;<Spacer />|<Spacer /></>: null}  
                
                {baths ? <>{baths}&nbsp;<FaBath />&nbsp;<Spacer />|<Spacer /></>: null}
                
                {sqft ? <>{sqft} sqft</>: null}
                
                </Flex>
        
                <Text fontSize='md'>
                {address.length > 30 ? address.substring(0, 40) + '...' : address}
                </Text>
            </Box>
        </Flex>
    );
}

export default PropertyInfoCard;