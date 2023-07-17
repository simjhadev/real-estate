import { Input } from '@chakra-ui/react';

const AutoSuggestionInput = ({address, onAddressInputChange}) => {
    return(
        <Input placeholder="Address, City, Zip" value={address} autoComplete="off" onChange={e => onAddressInputChange(e.target.value)}/>
    );
}

export default AutoSuggestionInput;