import axios from 'axios';

export const fetchAutocompleteZipcode = async (inputTxt) => {
  console.log("fetchAutocompleteZipcode");
  const options = {
    method: 'GET',
    url: 'https://autocomplete-usa.p.rapidapi.com/marketplace/autocomplete/usa/zipcodes/lite/'+inputTxt,
    headers: {
      'X-RapidAPI-Key': '83061cce27mshbc58e39e18187a3p1f9e02jsn6320043bda92',
      'X-RapidAPI-Host': 'autocomplete-usa.p.rapidapi.com'
    }
  };
  try{

    const data = await axios.request(options);
    //console.log(data);
    return data.data;
  }
  catch(error){
    console.error(error);
  }
}

export const fetchAutocompleteCity = async (inputTxt) => {
  console.log("fetchAutocompleteCity");
  const options = {
    method: 'GET',
    url: 'https://autocomplete-usa.p.rapidapi.com/marketplace/autocomplete/usa/cities/'+inputTxt,
    headers: {
      'X-RapidAPI-Key': '83061cce27mshbc58e39e18187a3p1f9e02jsn6320043bda92',
      'X-RapidAPI-Host': 'autocomplete-usa.p.rapidapi.com'
    }
  };
  try{

    const data = await axios.request(options);
    //console.log(data);
    return data.data;
  }
  catch(error){
    console.error(error);
  }
}

export const fetchAutocompleteAddress = async (inputTxt) => {
  console.log("fetchAutocompleteAddress");
  const options = {
    method: 'GET',
    url: 'https://autocomplete-usa.p.rapidapi.com/marketplace/autocomplete/usa/addresses/'+inputTxt,
    headers: {
      'X-RapidAPI-Key': '83061cce27mshbc58e39e18187a3p1f9e02jsn6320043bda92',
      'X-RapidAPI-Host': 'autocomplete-usa.p.rapidapi.com'
    }
  };
  try{

    const data = await axios.request(options);
    //console.log(data);
    return data.data;
  }
  catch(error){
    console.error(error);
  }
}

export const fetchCurrentLocation = async () => {
  const options = {
    method: 'GET',
    url: 'https://find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com/iplocation',
    params: {apikey: '873dbe322aea47f89dcf729dcc8f60e8'},
    headers: {
      'X-RapidAPI-Key': '83061cce27mshbc58e39e18187a3p1f9e02jsn6320043bda92',
      'X-RapidAPI-Host': 'find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com'
    }
  };
  try{
    const data = await axios.request(options);
    return data.data;
  }
  catch(error){
    console.error(error);
  }
}

export const fetchApi = async (limit, offset, search_location, status) => {
    const params = {
        limit : limit,
        offset : offset,
        status: status,
        search_location: search_location,
        sort: {"direction":"desc","field":"list_date"}
    };

   

    const options = {
        method: 'POST',
        url: 'https://realty-in-us.p.rapidapi.com/properties/v3/list',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '83061cce27mshbc58e39e18187a3p1f9e02jsn6320043bda92',
          'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com'
        },
        data : params
        //data: '{"limit":10,"offset":0,"postal_code":"90004","status":["for_sale","ready_to_build"],"sort":{"direction":"desc","field":"list_date"}}'
      };

    try{
        const data = await axios.request(options);
        
        return data.data;
        
    }
    catch(error){
        console.error(error);
    }
}

export const fetchPropertyDetailsApi = async (propertyId) => {
  const params = {
    property_id : propertyId
  };

  const options = {
    method: 'GET',
    url: 'https://realty-in-us.p.rapidapi.com/properties/v3/detail',
    params: params, 
    headers: {
      'X-RapidAPI-Key': '83061cce27mshbc58e39e18187a3p1f9e02jsn6320043bda92',
      'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com'
    }
  };

  try{
    const data = await axios.request(options);
    return data.data;
  }
  catch(error){
    console.error(error);
  }
}


