import { useState } from 'react';
import PropertyList from './PropertyList';
import PropertyDetails from '../PropertyDetails/PropertyDetails';

import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure
 } from '@chakra-ui/react';

const PropertyListContainer = ({propertyListInfo}) => {
    const [ selectedPId, setSelectedPId] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const openModalhandler = (property_id) => {
        onOpen();
        console.log("Open Modal : "+property_id);
        setSelectedPId(property_id);
    }

    return(
        <>
        <PropertyList propertyListInfo={propertyListInfo} onPropertyClick={openModalhandler} />

        <Modal isOpen={isOpen} size="full" onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Property Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody >
              <PropertyDetails property_id={selectedPId} propSearchType="sale"/>
            </ModalBody>
          </ModalContent>
        </Modal>
        </>
        
    )
};

export default PropertyListContainer;