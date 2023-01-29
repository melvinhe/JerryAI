import {
  Box,
  Button,
  Image,
  Container,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useState } from "react";

export function LegislatorArea({ personInfo }) {

   
  return (
    <>
      <Menu>
        <MenuButton as={Button}>Your Cats</MenuButton>
        <MenuList>
          {/* {personInfo?.map((item, i) => (
            <MenuItem minH="48px" key={i} onClick={() => alert('Kagebunshin')}>
            <span>{personInfo?.[i].first_name} {personInfo?.[i].last_name}</span>
          </MenuItem>
          ))} */}
          
            <MenuItem>
                
            </MenuItem>
          
        </MenuList>
      </Menu>
    </>
  );
}
