import { Heading, Textarea } from "@chakra-ui/react";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { SimpleSidebar } from "../components/SimpleSidebar";

const Summerize = () => (
    <>
    <SimpleSidebar>
        <Heading>Summerize a bill here</Heading>
        <Textarea placeholder='Here is a sample placeholder' />
    </SimpleSidebar>
    </>
    
  );
  
  export default Summerize;