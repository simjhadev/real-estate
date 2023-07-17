import { useState } from 'react';
import { Box } from '@chakra-ui/react';

import AutoSuggestionInput from "./AutoSuggestionInput";
import AutoSuggestionList from "./AutoSuggestionList";

const AutoSuggestion = ({address, onAddressInputChange, addressList}) => {
    const [isAutoSuggestOpen, setIsAutoSuggestOpen] = useState(false);
    
    const onAddressInputChangeHandler = (address) => {
        onAddressInputChange(address);
        setIsAutoSuggestOpen(true);
    }

    return(
        <Box pos='relative' width={'300px'}>
        <AutoSuggestionInput address={address} onAddressInputChange={onAddressInputChangeHandler} />
        <AutoSuggestionList addressList={addressList} isOpen={isAutoSuggestOpen} setIsAutoSuggestOpen={setIsAutoSuggestOpen} setAddress={onAddressInputChange}/>
        </Box>
    );
}

export default AutoSuggestion;