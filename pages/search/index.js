import { useState, useEffect} from 'react';
import dynamic from 'next/dynamic';
import { useAppContext } from '@/AppContext/store';
//import PropertyFilterSearch from '../../components/PropertyFilterSearch/PropertyFilterSearch'; 

import { fetchApi } from '@/utils/fetchApi';
import { Box, Text, Divider } from '@chakra-ui/react';
//import PropertyListContainer from '../../components/PropertySearchResult/PropertyListContainer';
//import NextPrevious from '@/components/NextPrevious';
//import ErrorPage from '@/components/ErrorPages/ErrorPage';
//import ErrorPageLayout from '@/components/ErrorPages/ErrorPageLayout';
import PropertyListLoading from '@/components/Placeholder/PropertyListLoading';
const PropertyFilterSearch = dynamic(() => import('../../components/PropertyFilterSearch/PropertyFilterSearch'),
{
  loading: () => <p>Loading.....</p>,
  ssr: false,
});

const PropertyListContainer = dynamic(() => import('../../components/PropertySearchResult/PropertyListContainer'),
{
  loading: () => <PropertyListLoading />,
  ssr: false,
});
const NextPrevious = dynamic(() => import('@/components/NextPrevious'),
{
  ssr: false,
});
const ErrorPage = dynamic(() => import('@/components/ErrorPages/ErrorPage'),
{
  ssr: false,
});
const ErrorPageLayout = dynamic(() => import('@/components/ErrorPages/ErrorPageLayout'),
{
  ssr: false,
});


const PropertyAdvanceSearch = ({prDtls, totalProperties, status, location, 
  bdmin, bdmax, pmin, pmax, offset, apiError}) => {
  const {limit, lastSearchedLoc, setLastSearchedLoc} = useAppContext();
  //const [currentOffset] = useState(parseInt(offset));

  useEffect(() => {
    if(lastSearchedLoc === ""){
      setLastSearchedLoc(location);
      //setLocRadius("1");
    } 
  },[]);
    
    return(
        <>
        <PropertyFilterSearch propertyStatus={status} location={location}
          bdmin={bdmin} bdmax={bdmax}
          pmin={pmin} pmax={pmax} />
         
        <Text fontSize={['xl','xl','2xl']} pt={20} fontWeight='medium' color="blue.500">Home For You</Text>
        <Text fontSize={['xs','md','lg']}  pb={2} color="gray.500">Based on your search</Text>
        <Divider />
              
        {
          parseInt(apiError) === 200 ? (
            prDtls !== null ? 
              <>
                <Box w='100%' pt={10}>
                  <PropertyListContainer propertyListInfo={prDtls}  />
                </Box>
                <NextPrevious totalProperties={totalProperties} propertyStatus={status} location={location} bdmin={bdmin} 
                  bdmax={bdmax} pmax={pmax} pmin={pmin} limit={limit} offset={offset}/>
              </>
            : 
            <ErrorPageLayout title='' description={"Unable to fetch data for the location : " + location} /> 
            )
          :
          <ErrorPage errCode={apiError}/>
        }
        
        </>  
    )
} 

export default PropertyAdvanceSearch;

export async function getServerSideProps(context){
  

  let prDtls = null, totalProperties = 0;
  let apiError = "";

  const createMaxMinObj = (minVal, maxVal) =>{
    if(minVal === null && maxVal === null ){
      return null;
    }
    else{
      let tempObj ={};
      if(maxVal !== null) tempObj.max = parseFloat(maxVal);
      if(minVal !== null) tempObj.min = parseFloat(minVal);
      return tempObj;
    }
  };

  const {status = "for_sale", 
    location  = "", 
    locRadius = 1,
    bdmin = null,
    bdmax = null,
    pmin = null,
    pmax = null,
    offset = 0} = context.query;

    const beds = createMaxMinObj(bdmin,bdmax);
    //const baths = createMaxMinObj(btmin,btmax);
    const list_price = createMaxMinObj(pmin,pmax);

    const fetchApiArgs = [
      6,
      parseInt(offset),
      {
        location: location, 
        radius: parseInt(locRadius)
      },
      [status],
      beds,
      list_price
    ]

    
  console.log ("Server Side rendering");
  //console.log(fetchApiArgs);
  
 try{
      const res = await fetchApi(...fetchApiArgs);
      //console.log("Search Page Indexxxxxxxxxxxxxxxx Try block", res);

      if(res.responseCode === 200){
        const propertyData = res.data;
        apiError = res.responseCode;
        if(propertyData?.data?.home_search !== null && propertyData?.data?.home_search?.total > 0){
          totalProperties = propertyData.data.home_search?.total;
        
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
      console.log("Search Page Index Catch Blockkkkkkkkkkkkkkkkkk", error);
      console.log(error);
      //apiError = error;
    }
     
    return { 
      props: { prDtls, totalProperties, status, location, bdmin, bdmax, pmin, pmax, offset, apiError },
      
    }
    
  }
