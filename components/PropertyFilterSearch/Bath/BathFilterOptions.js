import { HStack, Box, Select } from '@chakra-ui/react';

const BathFilterOptions = ({onBathRangeChange, bathCountRange}) => {
    
    const bathCntFromOptions = ['1','2','3','4','5'];
    const bathCntToOptions = ['1','2','3','4','5'];
    const {min, max} = bathCountRange;
    
    return(
        <HStack>
            <Box>From:
                <Select placeholder='No Min'
                value = {min}
                onChange={(e)=>onBathRangeChange(e.target.value,'RangeStart')}
                >
                {bathCntFromOptions.map(cnt => (
                <option value={cnt} key={'bathCntFOpt'+cnt}>{cnt}</option>)
                )}
                </Select>
            </Box>
            <Box>To:
                <Select placeholder='No Max'
                value = {max}
                onChange={(e)=>onBathRangeChange(e.target.value,'RangeTo')}
                >
                {bathCntToOptions.map(cnt => 
                    (<option value={cnt} key={'bathCntTOpt'+cnt}>{cnt}</option>)
                )}
                </Select>
            </Box>
        </HStack>

        
    )
};

export default BathFilterOptions;
