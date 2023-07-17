import { Button } from '@chakra-ui/react';
import ListingStatusFilter from "../ListingStatus/ListingStatusFilter";
import BedFilter from "../Bed/BedFilter";
import PriceFilter from "../Price/PriceFilter";

const FilterLayoutForDesktop = ({onListingStatusChange,listingStatus,onBedRangeChange,bedCountRange,
                                onPriceRangeChange,priceRange,onSearch}) => {
    return (
        <>
            <ListingStatusFilter 
                onListingStatusChange={onListingStatusChange}
                listingStatus={listingStatus}
            />
            <BedFilter 
                onBedRangeChange={onBedRangeChange}
                bedCountRange={bedCountRange}
            />
            {/* <BathFilter 
                onBathRangeChange={onBathRangeChange}
                bathCountRange={bathCountRange}
            /> */}
            <PriceFilter 
                onPriceRangeChange={onPriceRangeChange}
                priceRange={priceRange}
            />
            <Button h='0.5rem' size={['xs', 'xs', 'md']}  onClick={onSearch} backgroundColor={'blue.200'}>
                Search
            </Button>
        </>
    );
}

export default FilterLayoutForDesktop;