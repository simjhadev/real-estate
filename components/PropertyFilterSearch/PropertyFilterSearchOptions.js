import { FormControl, Box, useMediaQuery} from '@chakra-ui/react';

import FilterLayoutForDesktop from './FilterLayoutForDesktop/FilterLayoutForDesktop';
import FilterLayoutForMobTab from './FilterLayoutForMobTab/FilterLayoutForMobTab';
import AutoSuggestion from '../AutoSuggestion/AutoSuggestion';

const PropertyFilterSearchOptions = ({onListingStatusChange, listingStatus,
     onBedRangeChange, bedCountRange,
     onPriceRangeChange, priceRange, onSearch, onAddressInputChange, address, addressList}) => {

    const [isLargerThan800] = useMediaQuery('(min-width: 800px)');

    return(
        <FormControl>
            <Box display='inline-flex' width='100%' p={4} bgColor='gray.50'>
            <AutoSuggestion address={address} addressList={addressList} onAddressInputChange={onAddressInputChange} />
            {isLargerThan800 ?
                <FilterLayoutForDesktop 
                onListingStatusChange={onListingStatusChange}
                listingStatus={listingStatus}
                onBedRangeChange={onBedRangeChange}
                bedCountRange={bedCountRange}
                onPriceRangeChange={onPriceRangeChange}
                priceRange={priceRange}
                onSearch={onSearch}
            />
            :
                <FilterLayoutForMobTab 
                onListingStatusChange={onListingStatusChange}
                listingStatus={listingStatus}
                onBedRangeChange={onBedRangeChange}
                bedCountRange={bedCountRange}
                onPriceRangeChange={onPriceRangeChange}
                priceRange={priceRange}
                onSearch={onSearch}/>
            }
            
            
            </Box>
        </FormControl>
    )
} 

export default PropertyFilterSearchOptions;