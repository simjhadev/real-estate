import { useState, useEffect, useRef } from 'react';
import { Grid, GridItem, Box } from '@chakra-ui/react';
import PropertyImages from './PropertyImages';
import PropertyShortDesc from './PropertyShortDesc';
import PropertLongDesc from './PropertyLongDesc';
import ImageCarousel from './ImageCarousel';
import { fetchPropertyDetailsApi } from '@/utils/fetchApi';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure
} from '@chakra-ui/react';

  const PropertyDetails = ({property_id, propertySearchOption}) => {
    const [ propertyDtls, setpropertyDtls] =  useState(null);
    const [ selectedPic, setSelectedPic] = useState(0);
    const [ gridWidth, setGetWidth ] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const elementRef = useRef(null);
    

    useEffect(() => {
      setGetWidth(elementRef.current ? (elementRef.current.offsetWidth + 1) : 0);
    }, [elementRef.current?.offsetWidth]);

    useEffect(() => {

      fetchPropertyDetailsApi(property_id).then((data)=>{
        console.log({data});
        
        if(data.data.home != null){
          const result = data.data.home;
          const prDtls = {
            price: result?.list_price ? ("$" + new Intl.NumberFormat().format(result?.list_price)) : null,
            beds: result?.description?.beds,
            baths: result?.description?.baths,
            sqft: result?.description?.sqft,
            address: ([result?.location?.address?.line,",",result?.location?.address?.city,",",result?.location?.address?.state_code, result?.location?.address?.postal_code]).join(" "),
            estimate: result?.estimates?.current_values ? (result?.estimates?.current_values[0]?.estimate ? 
                      ("$" + new Intl.NumberFormat().format(result?.estimates?.current_values[0]?.estimate))
                      : null) : null,
            prop_type: ((result?.description?.type).replace("_"," ")).replace(/(\w)(\w*)/g,function(g0,g1,g2){return g1.toUpperCase() + g2.toLowerCase();}),
            year_built: result?.description?.year_built,
            heating: result?.description?.heating,
            cooling: result?.description?.cooling,
            parking: result?.description?.garage,
            hoa: result?.hoa?.fee,
            descriptionText: result?.description?.text,
            prop_details : result?.details,
            agents: result?.advertisers?.map((advertiser)=>({
                      agentName : advertiser.name,
                      agentEmail : advertiser.email
                    })),
            photos: result?.photos?.map((photo)=>(
                      (photo?.href).slice(0,-5)+"od-w1024_h768_x2.webp"
                    )),
          }
          setpropertyDtls(prDtls);
          console.log({prDtls});
        }
      });

    },[]);

    const openModalhandler = (picIndex) => {
      onOpen();
      setSelectedPic(picIndex);
    }
    
    return (
      <>
      <Grid templateColumns={{base: '1fr', md: 'repeat(5, 1fr)', lg: 'repeat(5, 1fr)'}} 
      templateRows={{base: gridWidth , md: 'repeat(5, 1fr)', lg: 'repeat(5, 1fr)'}} 
      h={{base: 'auto', md: '90vh', lg: '90vh'}} maxH={{base: 'auto', md: '90vh', lg: '90vh'}}
      overflowY={{base: 'scroll', md: 'hidden', lg: 'hidden'}} border='1px' borderColor='gray.200'
      ref={elementRef}>

        <GridItem rowSpan={{base: 1, md: 5, lg: 5}} colSpan={{base: 1, md: 3, lg: 3}} 
          overflowX='scroll'  
          overflowY={{base: "hidden", md: "scroll", lg:"scroll"}}>
          <PropertyImages propertyDtls={propertyDtls}  onImageClick={openModalhandler} gridCWidth={gridWidth} />
        </GridItem>

        <GridItem rowSpan='auto' colSpan={{base: 1, md: 2, lg: 2}} border='1px' borderColor='gray.200'>
            <PropertyShortDesc propertyDtls={propertyDtls} propertySearchOption={propertySearchOption}/>
        </GridItem>

        <GridItem rowSpan={{base: 1, md: 4, lg: 4}} colSpan={{base: 1, md: 2, lg: 2}} overflowY='scroll' border='1px' borderColor='gray.200'>
            <PropertLongDesc propertyDtls={propertyDtls} propertySearchOption={propertySearchOption} />
        </GridItem>

      </Grid>

      <Modal isOpen={isOpen}  isCentered size={'full'} onClose={onClose} colorScheme='blackAlpha'>
      <ModalOverlay />
      <ModalContent>
      <ModalHeader>Property Photos</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ImageCarousel propertyDtls={propertyDtls} selectedPicIndex={selectedPic}/>
        </ModalBody>
      </ModalContent>
      </Modal>
      </>
    )
  }

  export default PropertyDetails;