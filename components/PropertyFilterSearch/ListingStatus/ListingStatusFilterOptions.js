import { RadioGroup, Radio, Stack } from '@chakra-ui/react';

const ListingStatusFilterOptions = ({onListingStatusChange, listingStatus}) => {
    return(
        <RadioGroup defaultValue={listingStatus.statusVal} >
            <Stack>
                <Radio value='for_sale' onChange={(e)=>onListingStatusChange(e.target.value)}>For Sale</Radio>
                <Radio value='for_rent' onChange={(e)=>onListingStatusChange(e.target.value)}>For Rent</Radio>
            </Stack>
        </RadioGroup>  
    )
};

export default ListingStatusFilterOptions;
