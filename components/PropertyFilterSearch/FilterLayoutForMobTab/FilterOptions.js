import ListingStatusFilterOptions from "../ListingStatus/ListingStatusFilterOptions";
import BedFilterOptions from "../Bed/BedFilterOptions";
import PriceFilterOptions from "../Price/PriceFilterOptions";

import {VStack, StackDivider, Text, Button} from '@chakra-ui/react';
const FilterContainer = ({children, filterName}) => {
    return(
        <VStack align='stretch'>
            <Text color='blue.500' fontWeight='semibold'>{filterName}</Text>
            {children}
        </VStack>
        );
}

const FilterOptions = ({onListingStatusChange, listingStatus, onBedRangeChange, bedCountRange,
                        onPriceRangeChange, priceRange, onSearch}) => {
    return (
        <VStack divider={<StackDivider borderColor='gray.200' />}
                spacing={4} align='stretch'>
            <FilterContainer filterName="Listing Status"> 
                <ListingStatusFilterOptions onListingStatusChange={onListingStatusChange}
                listingStatus={listingStatus}/>
            </FilterContainer>
                
            <FilterContainer filterName="Bedroom">            
                <BedFilterOptions onBedRangeChange={onBedRangeChange}
                bedCountRange={bedCountRange}/>
            </FilterContainer>
            <FilterContainer filterName="Price"> 
                <PriceFilterOptions onPriceRangeChange={onPriceRangeChange}
                priceRange={priceRange}/>
            </FilterContainer>
            <Button w='80%' size={['xs', 'xs', 'md']}  onClick={onSearch} backgroundColor={'blue.200'}>
                Search
            </Button>
        </VStack>
    );
}

export default FilterOptions;