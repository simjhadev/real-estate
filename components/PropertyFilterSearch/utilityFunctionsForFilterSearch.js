export const setListingStatusState = (propertyStatus) => {
    switch(propertyStatus){
        case 'for_sale':
            return {statusVal: 'for_sale', displayTxt: 'Sale'};
        case 'for_rent':
            return {statusVal: 'for_rent', displayTxt: 'Rent'};
        default :
            return {statusVal: '', displayTxt: 'Listing Status'};
    }
}

export const setBedBathState = (minVal, maxVal, displayTxt) => {
    let tempTxt;
    if(minVal !== null && maxVal !== null){
        tempTxt = `${minVal} - ${maxVal} ${displayTxt}`;
    }
    else {
        if(minVal === null && maxVal === null){
            tempTxt = displayTxt;
        }
        else if(minVal === null){
            tempTxt = `Any - ${maxVal} ${displayTxt}`;
        }
        else if(maxVal === null){
            tempTxt = `${minVal}+ ${displayTxt}`
        }
    }

    return {
        min: (minVal ? minVal : ''),
        max: (maxVal ? maxVal : ''),
        displayTxt : tempTxt,
    };
}

export const setPriceState = (pmin, pmax) => {
    return {
        min: (pmin ? pmin : 0),
        max: (pmax ? pmax : 0),
        displayTxt: setDisplayTxtForPrice(pmin, pmax)
    };
}

export const setDisplayTxtForPrice = (pmin, pmax) => {
    let tempTxt, minValue, maxValue;
    tempTxt = "";
    minValue = (pmin === 0 || pmin === null || pmin === "") ? parseFloat(0) : parseFloat(pmin);
    maxValue = (pmax === 0 || pmax === null || pmax === "") ? parseFloat(0) : parseFloat(pmax);
    //console.log(pmin,pmax);
    //console.log(minValue,maxValue);

    if(minValue !== 0 && maxValue !== 0){
        tempTxt = `\$${new Intl.NumberFormat().format(minValue)} - \$${new Intl.NumberFormat().format(maxValue)}`;
    }else{
       if(minValue === parseFloat(0) && maxValue === parseFloat(0)){
            tempTxt = 'Price';
        }
        else if(minValue === parseFloat(0)){
            tempTxt = `Up To \$${new Intl.NumberFormat().format(maxValue)}`;
        }
        else if(maxValue === parseFloat(0)){
            tempTxt = `\$${new Intl.NumberFormat().format(minValue)}+`
        }
    }
    return tempTxt;
}

export const createQueryParams = (listingStatus, offset, location, bdmin, bdmax, pmin, pmax) => {
    const query = {
        status : listingStatus, 
        location  : location, 
        locRadius : "1",
        offset : offset,
    };


    if(bdmin !== '' && bdmin !== null){
        query.bdmin = bdmin;
    }
    if(bdmax !== '' && bdmax !== null){
        query.bdmax = bdmax;
    }
    /* if(bathCountRange.min !== ''){
        query.btmin = bathCountRange.min;
    }
    if(bathCountRange.max !== ''){
        query.btmax = bathCountRange.max;
    } */
    if(parseFloat(pmin) !== 0 && pmin !== null){
        query.pmin = pmin;
    }
    if(parseFloat(pmax) !== 0 && pmax !== null){
        query.pmax = pmax;
    }
    console.log(query);

    return query;

};