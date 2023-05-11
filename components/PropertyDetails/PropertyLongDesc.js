import React, {useState, useEffect} from 'react';
import { VStack, Text, Heading, Divider, Container, Grid, GridItem, Box } from '@chakra-ui/react';
import { BiBuildingHouse, BiCalendar } from 'react-icons/bi';
import { BsThermometerHalf, BsSnow } from 'react-icons/bs';
import { RiParkingBoxLine } from 'react-icons/ri';
import { FaHands } from 'react-icons/fa';

const PropertyLongDesc = ({propertyDtls}) => {
    const { prop_type, year_built, heating, cooling, parking, hoa, descriptionText, prop_details, agents} = {... propertyDtls};
    const [ propDescFlag, setPropDescFlag ] = useState({flag: false, desc: ""});
    const [ propDtlsFlag, setPropDtlsFlag ] = useState({flag: false, desc: ""});
    
    useEffect(()=>{
        //console.log('Inside useEffect', descriptionText, prop_details);
        
        if(propDescFlag.desc === "" && descriptionText?.length > 300){
            setPropDescFlag({
                ...propDescFlag,
                flag: false,
                desc: "READ MORE"
            });
        }

        if(propDtlsFlag.desc === "" && prop_details?.length > 1){
            setPropDtlsFlag({
                ...propDtlsFlag,
                flag: false,
                desc: "SEE MORE"
            });
        }
    },[descriptionText,prop_details]);

    

    const openCloseClickHandler = (flagVar, setflagVar, openTxt, closeTxt) => {
        
        if(flagVar.desc === openTxt){
            setflagVar({
                ...flagVar,
                flag: true,
                desc: closeTxt
            });
        }
        else if(flagVar.desc === closeTxt){
            setflagVar({
                ...flagVar,
                flag: false,
                desc: openTxt
            });
        }
    }

    
 
    return(
        
        
        <VStack w='100%' spacing={1} align='flex-start' pl={5} >
            <Heading fontSize={{base: '2xl', md: '3xl', lg: '3xl'}}>Overview</Heading><br/>
            <Grid templateColumns={'35px 1fr'} alignContent='center' rowGap={2}>
                {prop_type?
                    <>
                    <GridItem><BiBuildingHouse size='25px' color='#2B6CB0'/></GridItem>
                    <GridItem><Text fontSize='lg'> {prop_type}</Text></GridItem>
                    </>
                    :
                    null
                }
                {year_built?
                    <>
                    <GridItem><BiCalendar size='25px' color='#2B6CB0'/></GridItem>
                    <GridItem><Text fontSize='lg'>Built in {year_built}</Text></GridItem>
                    </>
                    :
                    null
                }
                {heating?
                    <>
                    <GridItem><BsThermometerHalf size='25px' color='#2B6CB0'/></GridItem>
                    <GridItem><Text fontSize='lg'>Heating: {heating}</Text></GridItem>
                    </>
                    :
                    null
                }
                {cooling?
                    <>
                    <GridItem><BsSnow size='25px' color='#2B6CB0'/></GridItem>
                    <GridItem><Text fontSize='lg'>Cooling: {cooling}</Text></GridItem>
                    </>
                    :
                    null
                }
                {parking?
                    <>
                    <GridItem><RiParkingBoxLine size='25px' color='#2B6CB0'/></GridItem>
                    <GridItem><Text fontSize='lg'>Parking: {parking}</Text></GridItem>
                    </>
                    :
                    null
                }
                {hoa?
                    <>
                    <GridItem><FaHands size='25px' color='#2B6CB0'/></GridItem>
                    <GridItem><Text fontSize='lg'>HOA: {hoa}</Text></GridItem>
                    </>
                    :
                    null
                }
                
            </Grid>
             
            <br />
            <Divider />
            {descriptionText ?
                <>
                <Container pl={0} pt={5}>
                    <Text>
                    {propDescFlag.desc === 'READ MORE' ? 
                        <>{descriptionText.substring(0, 400) + '...'}</>
                    : descriptionText}
                    </Text>
                
                {propDescFlag.desc != "" ?
                        <Text as='b' fontSize='sm' color='blue.400' cursor='pointer' 
                        onClick={() => openCloseClickHandler(propDescFlag, setPropDescFlag ,'READ MORE','READ LESS')}>
                            {propDescFlag.desc}
                        </Text>
                    :null}
                </Container>
                </>
            :null}
            
            <Text fontSize='2xl' as='b' pb='4' pt='6'>Features </Text>
            {prop_details ?
                <>
                {propDtlsFlag.desc === 'SEE MORE' ?
                    <>
                    <Text as='b'>{prop_details[0].category}</Text>
                    <Text>{prop_details[0].text ? 
                            prop_details[0].text.map((propDtlText,i)=>(
                                <Text pl='5' fontSize='sm' key={'pdtlTxt'+i}>{propDtlText}</Text>
                            ))
                            :null}
                    </Text>
                    <br />
                    </>
                :
                prop_details.map((prop_detail,i)=>(
                    <React.Fragment key={'pdtl'+i}>
                        <Text as='b'>{prop_detail.category}</Text>
                        <Text>{prop_detail.text ? 
                                prop_detail.text.map((propDtlText,i)=>(
                                    <Text pl='5' fontSize='sm' key={'pdtlTxt'+i}>{propDtlText}</Text>
                                ))
                                :null}
                        </Text>
                        <br />
                    </React.Fragment>
                    ))
                }

                {propDtlsFlag.desc != "" ?
                        <Text as='b' fontSize='sm' color='blue.400' cursor='pointer' 
                        onClick={() => openCloseClickHandler(propDtlsFlag, setPropDtlsFlag,'SEE MORE','SEE LESS')}>
                            {propDtlsFlag.desc}
                        </Text>
                    :null}
                </>

            :null}

            <Divider />
            {agents ? <Text as='b'>Listed By:</Text> : null}
            {agents ? 
                agents.map((agent,i)=>(
                <React.Fragment key={'a'+ i}>
                    {agent.agentName ? <Text>Agent_name : {agent.agentName}</Text> : null}
                    {agent.agentEmail ? <Text>Agent_email : {agent.agentEmail}</Text> : null}
                    <br />
                </React.Fragment>
                
            ))
            :
            null}
            
        </VStack>
        
    );
};

export default PropertyLongDesc;