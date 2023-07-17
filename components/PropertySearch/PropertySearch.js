import { useState, useEffect, useRef } from 'react';
import { Box, Input, InputGroup, InputRightElement, Button, List, ListItem } from '@chakra-ui/react';
import { fetchAutocompleteAddress, fetchAutocompleteZipcode, fetchAutocompleteCity } from '../../utils/fetchApi';

const PropertySearch = (props) => {
    
    const [addresses, setAddresses] = useState(null);
    const [autoSuggestOpen, setAutoSuggestOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const checkIfClickedOutside = e => {
          // If the menu is open and the clicked target is not within the menu,
          // then close the menu
          if (autoSuggestOpen && !ref?.current?.contains(e.target)) {
            setAutoSuggestOpen(false);
          }
        }
    
        document.addEventListener("mousedown", checkIfClickedOutside)
    
        return () => {
          // Cleanup the event listener
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }
      }, [autoSuggestOpen])

    useEffect(()=>{
        const delayDebounceFn = setTimeout(() => {
            if(props.value.length > 3){
                //console.log("Api call");
                const wordCount = props.value?.trim().split(/[,\s]/).length;
                if(wordCount == 1){
                    if(!isNaN(props.value.trim())){
                        fetchAutocompleteZipcode(props.value?.trim()).then((data)=>{
                            setAddresses(data.results?.map((result)=>result.postcode));
                        })
                        .catch((error) => {
                            setAddresses([]);
                        }); 
                    }
                    else{
                        fetchAutocompleteCity(props.value?.trim()).then((data)=>{
                            //console.log(data);                        
                            setAddresses(data.results?.map((result) => result.address_line1));
                        })
                        .catch((error) => {
                            setAddresses([]);
                        }); 
                    }
                }
                else{
                    fetchAutocompleteAddress(props.value?.trim()).then((data)=>{
                    //console.log(data);
                        setAddresses(data.results?.map((result)=>(result.address_line1+" "+ result.address_line2)));
                    })
                    .catch((error) => {
                        setAddresses([]);
                    });  
                }
            }
          }, 1000)
      
          return () => clearTimeout(delayDebounceFn)
    },[props.value]);

    const onChangeHandler = (e) => {
        if(props.onChange){
            props.onChange(e.target.value);
        }
        setAutoSuggestOpen(true);
    };

    const listItemClickHandler = (address) => {
        props.onChange(address);
        setAutoSuggestOpen(false);
    }
    
    return(
        <Box pos='relative' width='100%'>
        
        <InputGroup bg='white' width='100%'>
            <Input 
                size={['xs', 'md','lg']}
                type='text'
                value={props.value}
                p={5}
                placeholder='Address, City, Zipcode'
                _placeholder={{ opacity: 0.4, color: 'inherit' }}
                onChange={onChangeHandler}
                autoComplete="off"
                onClick={()=>{setAutoSuggestOpen(true)}}
            />
            
            <InputRightElement width='4rem'>
                <Button h='0.5rem' size={['xs', 'xs', 'md']} 
                onClick={props.onSearchClick}  p={4} me={1}>
                Search
                </Button>
            </InputRightElement>
        </InputGroup>

        {(addresses?.length > 0 && autoSuggestOpen) ? 
        <List ref={ref} width='100%' spacing={3} pos="absolute" zIndex="10" bg='white'
            p={5} maxH="300px" overflowY='scroll' border='1px' rounded='lg' borderColor='gray.200'
            mt='2'>
            {addresses.map((address,i)=>(
                <ListItem 
                    bgColor='white' key={"add"+i} cursor='pointer'
                    _hover={{ bg: 'gray.100' }}
                    onClick={()=>{listItemClickHandler(address)}}>
                    {address}
                </ListItem>
            ))}
        </List>
        : null}

        </Box>
    );
};

export default PropertySearch;