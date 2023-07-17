import { HStack, Box, Select } from '@chakra-ui/react';

const BedFilterOptions = ({onBedRangeChange, bedCountRange}) => {
    
    const bedCntFromOptions = ['1','2','3','4','5'];
    const bedCntToOptions = ['1','2','3','4','5'];
    const {min, max} = bedCountRange;
    
    return(
        <HStack>
            <Box>From:
                <Select placeholder='No Min'
                value = {min}
                onChange={(e)=>onBedRangeChange(e.target.value,'RangeStart')}
                >
                {bedCntFromOptions.map(cnt => (
                <option value={cnt} key={'bedCntFOpt'+cnt}>{cnt}</option>)
                )}
                </Select>
            </Box>
            <Box>To:
                <Select placeholder='No Max'
                value = {max}
                onChange={(e)=>onBedRangeChange(e.target.value,'RangeTo')}
                >
                {bedCntToOptions.map(cnt => 
                    (<option value={cnt} key={'bedCntTOpt'+cnt}>{cnt}</option>)
                )}
                </Select>
            </Box>
        </HStack>

        
    )
};

export default BedFilterOptions;
