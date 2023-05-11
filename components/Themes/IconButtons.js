import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const disabledNextPrevButtonIcon = defineStyle({
    borderRadius: "full",
    color: 'white',
    fontSize: '25px',
    background: 'gray.300',
    borderColor: 'gray.300',
    opacity: '0.6',
});

const nextPrevButtonIcon = defineStyle({
    borderRadius: "full",
    color: 'white',
    fontSize: '25px',
    background: 'blue.300',
    borderColor: 'blue.300',
    cursor: 'pointer',
    _hover: {
      background: "blue.500",
      borderColor: "blue.500"
    },
    _active: {
       background: "blue.500",
       borderColor: "blue.500"
      },
    
});

export const buttonTheme = defineStyleConfig({
    variants: { nextPrevButtonIcon, disabledNextPrevButtonIcon },
    
  })