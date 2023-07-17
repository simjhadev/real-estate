//import '@/styles/globals.css'


import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Layout from '@/components/Layout';
import { buttonTheme } from '@/components/Themes/IconButtons';
import { AppWrapper } from '@/AppContext/store';



export default function App({ Component, pageProps }) {
  const theme = extendTheme({
    components: {
      Button: buttonTheme,
    }
  });
 

  return (
    <AppWrapper>
      
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout> 
        
    </ChakraProvider>

      </AppWrapper>
  );
}
