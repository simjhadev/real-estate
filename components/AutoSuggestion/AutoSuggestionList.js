import { useEffect, useRef } from 'react';
import { List, ListItem } from '@chakra-ui/react';


const AutoSuggestionList = ({addressList, setAddress, isOpen, setIsAutoSuggestOpen}) => {
    
    const ref = useRef(null);

    useEffect(() => {
        const checkIfClickedOutside = e => {
          // If the menu is open and the clicked target is not within the menu,
          // then close the menu
          if (isOpen && !ref?.current?.contains(e.target)) {
            setIsAutoSuggestOpen(false);
          }
        }
    
        document.addEventListener("mousedown", checkIfClickedOutside)
    
        return () => {
          // Cleanup the event listener
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }
      }, [isOpen]);

      const listItemClickHandler = (address) => {
        setAddress(address);
        setIsAutoSuggestOpen(false);
    }

    return(
        <>
        {(addressList?.length > 0 && isOpen) ? 
        <List ref={ref} width='100%' spacing={3} pos="absolute" zIndex="10" bg='white'
            p={5} maxH="300px" overflowY='scroll' border='1px' rounded='lg' borderColor='gray.200'
            mt='2'>
            {addressList.map((address,i)=>(
                <ListItem 
                    bgColor='white' key={"add"+i} cursor='pointer'
                    _hover={{ bg: 'gray.100' }}
                    onClick={()=>{listItemClickHandler(address)}}>
                    {address}
                </ListItem>
            ))}
        </List>
        : null}
        </>
    );

}

export default AutoSuggestionList;