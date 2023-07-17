import { HStack, Box, Select } from '@chakra-ui/react';

const PriceFilterOptions = ({onPriceRangeChange, priceRange}) => {

    const priceOptions =['100000','200000','300000','400000','500000','600000','700000','800000','900000','1000000','1250000',
        '1500000','1750000','2000000','2250000','2500000','2750000','3000000','3250000','3500000','3750000','4000000'];
    
    //console.log(priceRange);
    const {min = '0', max = '0'} = priceRange;
    
    let minPriceOptions = [], maxPriceOptions = [];
    minPriceOptions = priceOptions.filter(price => (parseFloat(max) > 0) ? (parseFloat(price) <= parseFloat(max)) : true);
    //console.log("min Price" + minPriceOptions);
    
    maxPriceOptions = priceOptions.filter(price => (parseFloat(min) > 0) ? (parseFloat(price) >= parseFloat(min)) : true);
    //console.log("max Price" + maxPriceOptions);
    
    return(
        <HStack>
            <Box>Min:
                <Select 
                value = {min}
                onChange={(e)=>onPriceRangeChange(e.target.value,'MinVal')}
                >
                <option value={0} key='priceMin'>No Min</option>
                {minPriceOptions.map((price) => (
                <option value={price} key={'priceMin'+price}>{"$"+new Intl.NumberFormat().format(price)}</option>)
                )}
                </Select>
            </Box>
            <Box>Max:
                <Select
                value = {max}
                onChange={(e)=>onPriceRangeChange(e.target.value,'MaxVal')}
                >
                {maxPriceOptions.map((price) => 
                    (<option value={price} key={'priceMax'+price}>{"$"+new Intl.NumberFormat().format(price)}</option>)
                )}
                <option value={0} key='priceMax'>No Max</option>
                </Select>
            </Box>
        </HStack>  
    )
};

export default PriceFilterOptions;
