import {Button} from '@chakra-ui/react';
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure
 } from '@chakra-ui/react';

 import FilterOptions from './FilterOptions';

const FilterLayoutForMobTab = ({onListingStatusChange,listingStatus,onBedRangeChange,bedCountRange,
  onPriceRangeChange,priceRange,onSearch}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const searchHandler = (event) => {
      onClose();
      onSearch(event);
    }

    return (
        <>
        <Button bgColor={'blue.200'} ml={2} onClick={onOpen}>Filters</Button>

        <Modal isOpen={isOpen} size="full" onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Filters</ModalHeader>
            <ModalCloseButton />
            <ModalBody >
              <FilterOptions 
                onListingStatusChange={onListingStatusChange}
                listingStatus={listingStatus}
                onBedRangeChange={onBedRangeChange}
                bedCountRange={bedCountRange}
                onPriceRangeChange={onPriceRangeChange}
                priceRange={priceRange}
                onSearch={searchHandler}
                />
            </ModalBody>
          </ModalContent>
        </Modal>
        </>
        
    );
}

export default FilterLayoutForMobTab;