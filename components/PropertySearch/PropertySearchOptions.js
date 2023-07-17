import { Radio, RadioGroup, Text} from '@chakra-ui/react'

const PropertySearchOptions = (props) => {
    
    return (
      <RadioGroup onClick={(e) => props.onOptionClick(e.target.value)} 
      defaultValue='for_sale' bg="white" p={2}>
          <Radio value='for_sale' p={2} ><Text fontSize={['md','md','lg']}>Buy</Text></Radio>
          <Radio value='for_rent' p={2} ><Text fontSize={['md','md','lg']}>Rent</Text></Radio>
      </RadioGroup>
    )
}

export default PropertySearchOptions;