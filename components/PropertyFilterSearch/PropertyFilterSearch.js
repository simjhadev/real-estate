import { useState, useEffect } from 'react';
import { useAppContext } from '@/AppContext/store';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/react';
import PropertyFilterSearchOptions from './PropertyFilterSearchOptions';
import { fetchAutocompleteAddress, fetchAutocompleteCity, fetchAutocompleteZipcode } from '@/utils/fetchApi';
import { setListingStatusState, setBedBathState, setPriceState, setDisplayTxtForPrice } from './utilityFunctionsForFilterSearch';


const PropertyFilterSearch = ({propertyStatus, location, bdmin, bdmax, pmax, pmin}) => {
    const [listingStatus, setListingStatus] = useState(setListingStatusState(propertyStatus));
    const [bedCountRange, setBedCountRange] = useState(setBedBathState(bdmin, bdmax, "Beds"));
    //const [bathCountRange, setBathCountRange] = useState(setBedBathState(btmin, btmax, "Baths"));
    const [priceRange, setPriceRange] = useState(setPriceState(pmin, pmax));
    
    const [address, setAddress] = useState(location);
    const [addressList, setAddressList] = useState([]);

    const { setLastSearchedLoc } = useAppContext();

    const router = useRouter();

    

    // when the address is changed, it will trigger useEffect which will fetch address List for Auto complete address bar

    useEffect(() => {
        if( address !== location){
        console.log("Address", address);
        const delayDebounceFn = setTimeout(() => {
            if(address.length > 3){
                //console.log("Api call");
                const wordCount = address?.trim().split(/[,\s]/).length;
                if(wordCount == 1){
                    if(!isNaN(address.trim())){
                        fetchAutocompleteZipcode(address?.trim()).then((data)=>{
                        setAddressList(data.results?.map((result)=>result.postcode));
                        })
                        .catch((error) => {
                            setAddressList([]);
                        }); 
                    }
                    else{
                        fetchAutocompleteCity(address?.trim()).then((data)=>{                        
                        setAddressList(data.results?.map((result) => result.address_line1));
                        })
                        .catch((error) => {
                            setAddressList([]);
                        }); 
                    }
                }
                else{
                    fetchAutocompleteAddress(address?.trim()).then((data)=>{
                    //console.log(data);
                    setAddressList(data.results?.map((result)=>(result.address_line1+" "+ result.address_line2)));
                    })
                    .catch((error) => {
                        setAddressList([]);
                    });  
                }
            }
        }, 1000);

        return () => clearTimeout(delayDebounceFn);

        }
    },[address]);



    
    const listingStatusChangeHandler = (listingStatusVal) => {
        
        switch(listingStatusVal){
            case 'for_sale' :
                setListingStatus( lstatus => ({
                    ...lstatus,
                    statusVal: 'for_sale', 
                    displayTxt: 'For Sale'
                }));
                break;

            case 'for_rent' :
                setListingStatus( lstatus => ({
                    ...lstatus,
                    statusVal: 'for_rent', 
                    displayTxt: 'For Rent'
                }));
                break;
                
            default :
                setListingStatus( lstatus => ({
                    ...lstatus,
                    statusVal: '', 
                    displayTxt: 'Listing Status'
                }));
        }
    }

    const rangeChange = (prevRange, selectedVal, selectType, rangeType) => {
        let minVal, maxVal, displayTxt;

        minVal = (rangeType === "RangeTo") ? prevRange.min : selectedVal;
        maxVal = (rangeType === "RangeStart") ? prevRange.max : selectedVal;

        if(minVal !== "" && maxVal !== ""){
            if(rangeType === "RangeStart"){
                maxVal = parseFloat(minVal) > parseFloat(maxVal) ? minVal : maxVal;
            }
            if(rangeType === "RangeTo"){
                minVal = parseFloat(maxVal) < parseFloat(minVal) ? maxVal : minVal;
            }
            displayTxt = `${minVal} - ${maxVal} ${selectType}`;
        }
        else{
            if(minVal === "" && maxVal === ""){
                displayTxt = selectType;
            }
            else if(minVal === ""){
                displayTxt = `Any - ${maxVal} ${selectType}`;
            }
            else if(maxVal === ""){
                displayTxt = `${minVal}+ ${selectType}`
            }
        }
        
        return {
            ...prevRange,
            min : minVal,
            max : maxVal,
            displayTxt : displayTxt
        };
    }

    const onBedRangeChangeHandler = (selectedVal, selectedType) => {
     
        switch(selectedType){
            case 'RangeStart' :
                setBedCountRange( prevRange => rangeChange(prevRange, selectedVal, "Beds", selectedType));
            break;

            case 'RangeTo' :
                setBedCountRange( prevRange => rangeChange(prevRange, selectedVal, "Beds", selectedType));
            break;

            default :
                setBedCountRange(  prevRange => ({
                    ...prevRange,
                    min: "",
                    max: "",
                    displayTxt: "Beds"
                }));
        }
    }

    /* const onBathRangeChangeHandler = (selectedVal, selectedType) => {
     
        switch(selectedType){
            case 'RangeStart' :
                setBathCountRange( prevRange => rangeChange(prevRange, selectedVal, "Baths", selectedType));
            break;

            case 'RangeTo' :
                setBathCountRange( prevRange => rangeChange(prevRange, selectedVal, "Baths", selectedType));
            break;

            default :
                setBathCountRange(  prevRange => ({
                    ...prevRange,
                    min: "",
                    max: "",
                    displayTxt: "Baths"
                }));
        }
    } */

const onPriceRangeChangeHandler = (selectedVal, selectedType) => {
        
        switch(selectedType){
            case 'MinVal' :
                setPriceRange( prevRange => ({
                    ...prevRange,
                    min: selectedVal,
                    displayTxt: setDisplayTxtForPrice(selectedVal,prevRange.max),
                }));
            break;

            case 'MaxVal' :
                setPriceRange( prevRange => ({
                    ...prevRange,
                    max: selectedVal,
                    displayTxt: setDisplayTxtForPrice(prevRange.min, selectedVal),
                }));
            break;

            default :
             setPriceRange(  prevRange => ({
                    ...prevRange,
                    min: 0,
                    max: 0,
                    displayTxt: "Price"
                }));
        }
    }

    const createQueryParams = () => {
        const query = {
            status : listingStatus.statusVal, 
            location  : address, 
            locRadius : "1",
        };


        if(bedCountRange.min !== ''){
            query.bdmin = bedCountRange.min;
        }
        if(bedCountRange.max !== ''){
            query.bdmax = bedCountRange.max;
        }
        /* if(bathCountRange.min !== ''){
            query.btmin = bathCountRange.min;
        }
        if(bathCountRange.max !== ''){
            query.btmax = bathCountRange.max;
        } */
        if(parseFloat(priceRange.min) !== 0){
            query.pmin = priceRange.min;
        }
        if(parseFloat(priceRange.max) !== 0){
            query.pmax = priceRange.max;
        }
        console.log(query);

        return query;

    };

    const searchHandler = (e) => {
        e.preventDefault();
        setLastSearchedLoc(address);
        router.push({
            pathname: '/search',
            query: createQueryParams(),
        });
    }

    return(
        <Box>
            <PropertyFilterSearchOptions 
                onSearch={searchHandler}
                onListingStatusChange={listingStatusChangeHandler}
                listingStatus={listingStatus} 
                onBedRangeChange={onBedRangeChangeHandler}
                bedCountRange={bedCountRange}
                onPriceRangeChange={onPriceRangeChangeHandler}
                priceRange={priceRange}
                onAddressInputChange={setAddress}
                address={address}
                addressList={addressList}
            />
        </Box>
    )
} 

export default PropertyFilterSearch;