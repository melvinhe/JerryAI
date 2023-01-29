import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  Box,
} from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";

import Image from "next/image"
import georgeW1 from "../public/georgeW1.png"

import { Footer } from "../components/Footer";
import { CTAIllustration } from "../components/CTAIllustration";
import { NavBar } from "../components/NavBar";
import { DarkModeSwitch } from "../components/DarkModeSwitch";

const Index = () => (
  <>
  <NavBar/>
  <DarkModeSwitch/>
  <Box display={"flex"}>
    <CTAIllustration/>
    <Image src={georgeW1} alt="george washing art" width="500" height="500"/>
  </Box>
  <Footer/>
  </>
  
);

export default Index;
