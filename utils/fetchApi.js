import axios from 'axios';

export const fetchAutocompleteZipcode = async (inputTxt) => {
  console.log("fetchAutocompleteZipcode");
  const options = {
    method: 'GET',
    url: 'https://api.geoapify.com/v1/geocode/autocomplete?text='+inputTxt+'&type=postcode&limit=10&format=json&filter=countrycode:us&apiKey=0ba651f6ff894a8fadae712ffef6f9aa',
    headers: {}
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
    url: 'https://api.geoapify.com/v1/geocode/autocomplete?text='+inputTxt+'&type=city&limit=10&format=json&filter=countrycode:us&apiKey=0ba651f6ff894a8fadae712ffef6f9aa',
    headers: {}
  };
  try{

    const data = await axios.request(options);
    console.log(data);
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
    url: 'https://api.geoapify.com/v1/geocode/autocomplete?text='+inputTxt+'&limit=10&format=json&filter=countrycode:us&apiKey=0ba651f6ff894a8fadae712ffef6f9aa',
    headers: {}
  };
  try{

    const data = await axios.request(options);
    console.log(data);
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

export const fetchApi = async (limit, offset, search_location, status, beds, list_price) => {
    const params = {
        limit : limit,
        offset : offset,
        status: status,
        search_location: search_location,
        sort: {"direction":"desc","field":"list_date"}
    };

    if(beds !== null){
      params.beds = beds;
    }
    /* if(baths !== null){
      params.baths = baths;
    } */
    if(list_price !== null){
      params.sold_price = list_price;
    }

   //console.log(params);
   

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
      console.log(options);
        const data = await axios.request(options);
        
        console.log("fetchApiiiiiiiiiiiiii Try Block", data.status);
        console.log(data.data);
        return {
          responseCode : data.status,
          data : data.data};
        
    }
    catch(error){
      console.log("fetchApiiiiiiiiiiiiii Catch Block", error.response.status);
        return {
          responseCode : error.response.status,
          data: ""
        };
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


