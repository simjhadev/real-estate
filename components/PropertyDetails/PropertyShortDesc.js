import { VStack, Text } from '@chakra-ui/react';

const PropertyShortDesc = ({propertyDtls, propertySearchOption}) => {
    const { price, beds, baths, sqft, address, estimate } = {... propertyDtls};
    return(
        <VStack w='100%' spacing={4} align='flex-start' pl={5} pb={5}>
            {price ?
                <Text fontSize={{base: '2xl', md: '3xl', lg: '3xl'}} as='b' >{price}</Text>
            :null}
            
            <Text fontSize='lg'>{beds ? <>{beds} bd | </>:null}
                                {baths ? <>{baths} ba | </>:null}
                                {sqft ? <>{sqft} sqft</>:null}</Text>
            {address ?
                <Text>{address}</Text>
            :null}

            {(propertySearchOption==='sale' && estimate) ?
                <Text fontSize='lg' color='blue.600'><b>Estimate :</b> {estimate}</Text>
            :null}
            
        </VStack>
    );
};

export default PropertyShortDesc;