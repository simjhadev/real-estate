
import { useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useAppContext } from '../AppContext/store';

import { Flex, Box, Text, Center, Divider } from '@chakra-ui/react';


import LandingPgPic from '@/images/LandingPgPic.jpg';
import { fetchApi, fetchCurrentLocation } from '../utils/fetchApi';
//import PropertySearch from '@/components/PropertySearch/PropertySearch';

//import PropertyListContainer from '@/components/PropertySearchResult/PropertyListContainer';
//import ErrorPage from '@/components/ErrorPages/ErrorPage';
//import ErrorPageLayout from '@/components/ErrorPages/ErrorPageLayout';
import PropertyListLoading from '@/components/Placeholder/PropertyListLoading';
const DPropertySearch = dynamic(() => import('@/components/PropertySearch/PropertySearch'),
{
  ssr: false,
});
const DPropertyListContainer = dynamic(() => import('@/components/PropertySearchResult/PropertyListContainer'),
{
  loading: () => <PropertyListLoading />,
  ssr: false,
});
const DErrorPage = dynamic(() => import('@/components/ErrorPages/ErrorPage'),
{
  ssr: false,
});
const DErrorPageLayout = dynamic(() => import('@/components/ErrorPages/ErrorPageLayout'),
{
  ssr: false,
});



const imgURL = `url(${LandingPgPic.src})`;

export default function Home({ currentLoc, prDtls, apiError }) {
  
  const {location, setLocation,
        lastSearchedLoc, setLastSearchedLoc,
        locRadius, setLocRadius, 
        searchStatus} = useAppContext();
  const [searchAddress, setSearchAddress] = useState(currentLoc);

  const router = useRouter();

  console.log(currentLoc, prDtls, apiError);

  useEffect(() => {
    if(location === ""){
      setLocation(currentLoc);
      //setLocRadius("1");
    }
    
  },[]);



  const searchClickHandler = () => {
    //console.log("Search Clicked");
    setLastSearchedLoc(searchAddress);

    router.push({
      pathname: '/search',
      query: {
        status : searchStatus,
        location  : searchAddress,
        locRadius : locRadius,
      }
    })
  }

  return (
    
    <Box>

      <Box position='relative' h="60vh" w='100%'>
        <Image src={LandingPgPic} 
          fill={true}
          style={{objectFit: "cover"}}
          placeholder="blur"
          loading="lazy"
          alt="Landing Page Pic"/>
          <Center h='100%' w='100%'>
              <Flex direction='column' shrink='1' align='center' bg='white' p='2' rounded='md' 
                  w={{ base: '90%', sm: '80%', md: '60%' }}>
                <DPropertySearch value={searchAddress} onSearchClick={searchClickHandler} onChange={setSearchAddress} />
                 
              </Flex> 
          </Center>
      </Box>
      
      

      <Text fontSize={['xl','xl','2xl']} pt={20} fontWeight='medium' color="blue.500">Home For You</Text>
      <Text fontSize={['xs','md','lg']}  pb={2} color="gray.500">Based on your search</Text>
      <Divider />
      
        <Box w='100%' pt={10}>
          {
            parseInt(apiError) === 200 ? (
              prDtls === null ? 
              <DErrorPageLayout title='' description={"Unable to fetch data for the location : " + currentLoc} /> 
              :
              <DPropertyListContainer propertyListInfo={prDtls} /> 
            )
            :
            <DErrorPage errCode={apiError}/>
          }
        </Box>
      
      
    </Box>
    
  )
}

export async function getServerSideProps(context){

  const {
    status = "for_sale", 
    location  = "", 
    locRadius = 1,
    limit = 6,
    offset = 0} = context.query;

  let currentLoc = "";
  let propertyData = "";
  let prDtls = null;
  let apiError = "";
  
  if(location === ""){
    const locData = await fetchCurrentLocation();
    currentLoc = locData ? (locData.city + ", " + locData.zipCode) : "USA";
  }
  else{
    currentLoc = location;
  }
  

  //console.log ("Server Side rendering", currentLoc);
  
 
  try{
    const res = await fetchApi(limit, offset, {location: currentLoc, radius: parseInt(locRadius)}, [status]);
    console.log("Indexxxxxxxxxxxxxxxx Try block", res);
    
    if(res.responseCode === 200){
      propertyData = res.data;
      apiError = res.responseCode;
        if(propertyData?.data?.home_search !== null && propertyData?.data?.home_search?.total > 0){
        
          prDtls = propertyData.data.home_search?.results?.map((result)=>({
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
        } 
    }
    else{
      apiError = res.responseCode;
    }

  }
  catch(error){
    console.log("Index Catch Blockkkkkkkkkkkkkkkkkk", error);
    console.log(error);
    //apiError = error;
  }
    
  return { 
    props: { currentLoc, prDtls, apiError }
  }
}
