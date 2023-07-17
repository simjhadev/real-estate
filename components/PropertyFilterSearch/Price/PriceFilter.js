import CustomPopover from '../CustomPopover';
import {Box} from '@chakra-ui/react';
import PriceFilterOptions from './PriceFilterOptions';

const PriceFilter = ({onPriceRangeChange, priceRange}) => {
    
    const { displayTxt } = priceRange;

    return(
        <CustomPopover filterName={displayTxt} popoverHeader='Price'>
            <PriceFilterOptions onPriceRangeChange={onPriceRangeChange}
            priceRange={priceRange}/>
        </CustomPopover>
    )
};

export default PriceFilter;