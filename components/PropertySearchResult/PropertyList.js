
import PropertyInfoCard from './PropertyInfoCard';
import PlaceholderCardList from '../Placeholder/PlaceholderCardList';
import { SimpleGrid, Center } from '@chakra-ui/react';



const PropertyList = ({propertyListInfo, onPropertyClick}) => {
     
    return(
        <Center w='100%'>
          <SimpleGrid columns={{base: 1, md: 2, lg: 2, xl: 3}} spacing={1}>
            {propertyListInfo ? 
            <>
            {propertyListInfo.map((pDtl)=>(
            <PropertyInfoCard propertyDtls ={pDtl} key={pDtl.property_id} onPropertyClick={onPropertyClick} />))} 
            </>
            :<PlaceholderCardList count={6}/>}
          </SimpleGrid>
        </Center>

    );
}

export default PropertyList;