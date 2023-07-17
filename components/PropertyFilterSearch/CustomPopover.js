import { useState } from 'react';

import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverArrow,
         PopoverBody, PopoverCloseButton, Box } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { BsChevronCompactDown, BsChevronCompactUp} from 'react-icons/bs';


const CustomPopover = (props) => {
    const [popOverOpenStatus, setPopOverOpenStatus] = useState(false);

    return(
        <Box display='inline-flex' pl={1.5} pr={1.5}>
        <Popover placement='bottom-start' onOpen={()=>setPopOverOpenStatus(true)} 
        onClose={()=>setPopOverOpenStatus(false)}>
            <PopoverTrigger>
                <Button rightIcon={popOverOpenStatus ? <BsChevronCompactUp/> : <BsChevronCompactDown/>} bgColor='gray.200'
                >
                    {props.filterName}</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverHeader fontWeight='semibold'>{props.popoverHeader}</PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                    {props.children}
                </PopoverBody>
            </PopoverContent>
        </Popover> 
        </Box>
    )
};

export default CustomPopover;

