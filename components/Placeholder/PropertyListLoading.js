import PlaceholderCardList from './PlaceholderCardList';
import { SimpleGrid, Center } from '@chakra-ui/react';

const PropertyListLoading = () => {
    return(
        <Center w='100%'>
          <SimpleGrid columns={{base: 1, md: 2, lg: 2, xl: 3}} spacing={1}>
            <PlaceholderCardList count={6}/>
          </SimpleGrid>
        </Center>
    );
}

export default PropertyListLoading;