import ErrorPageLayout from './ErrorPageLayout';

const ErrorPage = ({errCode}) => {
    switch(parseInt(errCode)){
        case 404:
            return(
                <ErrorPageLayout 
                    title='Someting went wrong.' 
                    description='Its 404 error. Unable to connect to the Api to fetch property details.'
                />
            );

        default :
            return(
                <ErrorPageLayout 
                    title='Someting went wrong.' 
                    description='Unable to connect to the Server. Please try again later.'
                />
            );
    }
    
};

export default ErrorPage;