import { Radio, RadioGroup, Text} from '@chakra-ui/react'

const PropertySearchOptions = (props) => {
    
    return (
      <RadioGroup onClick={(e) => props.onOptionClick(e.target.value)} 
      defaultValue='sale' bg="white" p={2}>
          <Radio value='sale' p={2} ><Text fontSize={['md','md','lg']}>Buy</Text></Radio>
          <Radio value='rent' p={2} ><Text fontSize={['md','md','lg']}>Rent</Text></Radio>
      </RadioGroup>
    )
}

export default PropertySearchOptions;