//import '@/styles/globals.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Layout from '@/components/Layout';
import { buttonTheme } from '@/components/Themes/IconButtons';


export default function App({ Component, pageProps }) {
  const theme = extendTheme({
    components: {
      Button: buttonTheme,
    }
  });
  
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        
        <Component {...pageProps} />
        
      
      </Layout>   
      </ChakraProvider>
    
  
  );
}
