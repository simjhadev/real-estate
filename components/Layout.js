import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Box } from '@chakra-ui/react';

//import Footer from './Footer';
//import Navbar from './Navbar';
const Footer = dynamic(() => import('./Footer'),
{
  ssr: false,
});
const Navbar = dynamic(() => import('./Navbar'),
{
  ssr: false,
});

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Real Estate</title>
      </Head>
      <Box m='auto'>
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
      </Box>
    </>
  );
}