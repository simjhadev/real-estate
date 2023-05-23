import { useState, useEffect } from 'react';
import PropertyInfoCard from './PropertyInfoCard';
import PlaceholderCardList from '../Placeholder/PlaceholderCardList';
import { SimpleGrid, Flex, Spacer, Center } from '@chakra-ui/react';
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure
 } from '@chakra-ui/react';
import PropertyDetails from '../PropertyDetails/PropertyDetails';
import { fetchApi, fetchCurrentLocation } from '../../utils/fetchApi';

import { IoChevronBackCircleSharp, IoChevronForwardCircleSharp } from 'react-icons/io5';


const PropertyList = (props) => {
    
    const [ fetchType, setFetchType] = useState(null); /** value - initial, next, prev, null */
    const [ pDtls, setPDtls ] = useState(null);
    const [ selectedPId, setSelectedPId] = useState(null);
    //const [ resultTotal, setResultTotal] = useState(0);
    const [ offset, setOffset ] = useState(0);
    const [ disablePrev, setDisablePrev ] = useState(true);
    const [ disableNext, setDisableNext ] = useState(true);
    const [ propertyFetchError, setPropertyFetchError] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();


    useEffect(()=>{
      /**Inital load fetch approximate location.(City and ZipCode)
       * and that location data is used to load data in the the Property List **/
      if(!props.searchParams.searchLocation){
        fetchCurrentLocation().then((data)=>{
          props.changeSearchParams({
            ...props.searchParams,
            searchLocation: data.city+", "+data.zipCode
          });
        }).catch((error)=>{
          console.log("Cannot fetch CurrentLocation");
          props.changeSearchParams({
            ...props.searchParams,
            searchLocation: 'USA'
          });
        });
      }
    },[]);

    useEffect (()=>{
      //For the initial load and whenever the search button is clicked, the fetch Type is set to Initial.
      if(props.searchParams.searchLocation){
        setFetchType("Initial");
      }
    },[props.searchParams]);
    
    useEffect (()=>{
      /* In this useEffect call the Property list is fetched depending on the 
      fetch call(Initial, Prev, Next) and Property list component is updated.*/
      if(fetchType && props.searchParams.searchLocation){

        /* Set parameters for FETCH call ----------- Start */
        const limit = 6; 
        let tempOffset= 0;
        let status = [];

        switch (fetchType){
          case 'prev':
            tempOffset = offset - 6;
            setDisablePrev(true);
            break;
          case 'next':
            tempOffset = offset + 6;
            setDisableNext(true);
            break;
          default :
            tempOffset = 0;
        }
        
      const search_location= {
        location: props.searchParams?.searchLocation ? props.searchParams?.searchLocation : "USA"
      };
      if(props.searchParams?.searchLocation?.split(" ").length <= 1 && props.searchParams?.searchLocation !== 'USA'){
        search_location.radius = 0;
      }
      else{
        search_location.radius = 1;
      }

      
      if(props.searchParams?.searchOption === "sale"){
        status = ["for_sale","ready_to_build"];
      }
      else{
        status = ["for_rent"];
      }
      /* Set parameters for FETCH call ----------- End */
      
      fetchApi(limit, tempOffset, search_location, status).then((data)=>{
        console.log({data});
        if(data.data.home_search != null){
          const total = data.data.home_search?.total;
          const prDtls = data.data.home_search?.results?.map((result)=>({
            property_id : result?.property_id,
            coverPhoto: result?.primary_photo?.href ? (result?.primary_photo?.href).slice(0,-5)+"od-w1024_h768_x2.webp" : null,
            coverPhotoLowRes: result?.primary_photo?.href ? result.primary_photo.href : null,
            prop_type: ((result?.description?.type).replace("_"," ")).replace(/(\w)(\w*)/g,function(g0,g1,g2){return g1.toUpperCase() + g2.toLowerCase();}),
            price: result?.list_price ? ("$" + new Intl.NumberFormat().format(result?.list_price)) : null,
            beds: result?.description?.beds,
            baths: result?.description?.baths,
            sqft: result?.description?.sqft,
            address: ([result?.location?.address?.line,",",result?.location?.address?.city,",",result?.location?.address?.state_code, result?.location?.address?.postal_code]).join(" "),
            estimate: result?.estimate?.estimate ? ("$" + new Intl.NumberFormat().format(result?.estimate?.estimate)) : null,
          }));

        
          //setPropertyArr(data);
          console.log(fetchType+"------------------------------");   
          setPDtls(prDtls);
          setPropertyFetchError("");
          setFetchType(null);


          /* Enable Disable Next -------------- Start */
          if(total <= (tempOffset + 6)){
            setDisableNext(() => true);
          }
          else{
            setDisableNext(() => false);
          }
          /* Enable Disable Next -------------- End */

          /* Enable Disable Prev -------------- Start */
          if((tempOffset - 6) < 0){
            setDisablePrev(() => true);
          }
          else{
            setDisablePrev(() => false);
          }
          /* Enable Disable Prev -------------- End */
          //setResultTotal(total);  
          setOffset(tempOffset);
          
        }
      }).catch((error)=>{
        console.log("Unable to retrieve Property data.");
        setPropertyFetchError("Unable to retrieve Property data.");
      });

      
    } //if fetchType close. 
      
  },[fetchType]);

  
    const prevClickHandler = () => {
      if(!disablePrev){
        setFetchType('prev');
        
      }
    }

    const nextClickHandler = () => {
      if(!disableNext){
        setFetchType('next');
        
      }
      
    }
    const openModalhandler = (property_id) => {
        onOpen();
        console.log("Open Modal : "+property_id);
        setSelectedPId(property_id);
    }
    
    return(
        <>
        <Center w='100%'>
          <SimpleGrid columns={{base: 1, md: 2, lg: 2, xl: 3}} spacing={1}>
            {pDtls ? 
            <>
            {pDtls.map((pDtl)=>(
            <PropertyInfoCard propertyDtls ={pDtl} key={pDtl.property_id} onPropertyClick={openModalhandler} />))} 
            </>
            :<PlaceholderCardList count={6}/>}
          </SimpleGrid>
        </Center>
          
          {/*total : {resultTotal}
          offset : {offset}
          PageNo : {pageNo}
          */}

          {pDtls?
          <Center>

          <Flex w='10%'>
            <IoChevronBackCircleSharp size='30px' 
            style ={ disablePrev ? {color : '#d3d3d3'} : {color : '#54a2d2'}} 
          
            cursor='pointer'
            onClick={prevClickHandler} 
            />
            <Spacer />
            <IoChevronForwardCircleSharp size='30px' 
            style ={ disableNext ? {color : '#d3d3d3'} : {color : '#54a2d2'}} 
            
            cursor='pointer' 
            onClick={nextClickHandler}/>
          </Flex>
          </Center>
          : null}
      
        
        
        <Modal isOpen={isOpen} size="full" onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Property Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody >
              <PropertyDetails property_id={selectedPId} propSearchType={props.searchParams?.searchOption}/>
            </ModalBody>
          </ModalContent>
        </Modal>

        </>   
    );
}

export default PropertyList;