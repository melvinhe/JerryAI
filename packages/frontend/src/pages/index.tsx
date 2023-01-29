import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";

import { Footer } from "../components/Footer";
import { CTAIllustration } from "../components/CTAIllustration";
import { NavBar } from "../components/NavBar";
import { DarkModeSwitch } from "../components/DarkModeSwitch";

const Index = () => (
  <>
  <NavBar/>
  <DarkModeSwitch/>
  <CTAIllustration/>
  <Footer/>
  </>
  
);

export default Index;
