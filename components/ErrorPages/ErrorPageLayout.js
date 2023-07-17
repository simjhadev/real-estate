import {Alert, AlertIcon, AlertTitle, AlertDescription} from '@chakra-ui/react';

const ErrorPageLayout = ({title, description}) => {
    return(
        <Alert
            status='error'
            variant='subtle'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            height='200px'
        >
            <AlertIcon boxSize='40px' mr={0} />
            <AlertTitle mt={4} mb={1} fontSize='lg'>
                {title}
            </AlertTitle>
            <AlertDescription maxWidth='sm'>
                {description}
            </AlertDescription>
        </Alert>
    );
}

export default ErrorPageLayout;