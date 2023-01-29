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

export function LegislatorArea({ personInfo }) {
  return (
    <>
      <Menu>
        <MenuButton as={Button}>Your Cats</MenuButton>
        <MenuList>
          {personInfo?.members.map((item, i) => (
            <MenuItem minH="48px" key={i} onClick={() => alert('Kagebunshin')}>
            <span>{personInfo?.members[i].first_name} {personInfo?.members[i].last_name}</span>
          </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
}
