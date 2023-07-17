import Link from 'next/link';
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Flex, Box, Spacer } from '@chakra-ui/react';
import { FcMenu, FcHome, FcAbout } from 'react-icons/fc';
import { BsSearch } from 'react-icons/bs';
import { FiKey } from 'react-icons/fi';

import { useAppContext } from '../AppContext/store';

const Navbar = () => {

  const { location, lastSearchedLoc, locRadius, searchStatus} = useAppContext();

  const loc = (lastSearchedLoc === "" ? location : lastSearchedLoc);
  
  return (
  <Flex p='2' borderBottom='1px' borderColor='gray.100'>
    <Box fontSize='3xl' color='blue.400' fontWeight='bold'>
      <Link href='/'>Real Estate</Link>
    </Box>
    <Spacer />
    <Box>
      <Menu>
        <MenuButton as={IconButton} icon={<FcMenu />} variant='outline' color='red.400' />
        <MenuList>
        <Link href={"/?status=for_sale&location=" + loc + "&locRadius=" + locRadius } passHref>
            <MenuItem icon={<FcHome />}>Home</MenuItem>
          </Link>
          <Link href={"/search?status="+ searchStatus +"&location=" + loc + "&locRadius=" + locRadius } passHref>
            <MenuItem icon={<BsSearch />}>Search</MenuItem>
          </Link>
          <Link href={"/search?status=for_sale&location=" + loc + "&locRadius=" + locRadius } passHref>
            <MenuItem icon={<FcAbout />}>Buy Property</MenuItem>
          </Link>
          <Link href={"/search?status=for_rent&location=" + loc + "&locRadius=" + locRadius } passHref>
            <MenuItem icon={<FiKey />}>Rent Property</MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </Box>
  </Flex>
)};

export default Navbar;