import { Divider, Heading, Textarea } from "@chakra-ui/react";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { SimpleSidebar } from "../components/SimpleSidebar";

import { SimpleModal } from "../components/SimpleModal";

const Generate = () => (
    <>
    <SimpleSidebar>
        <Heading margin={5}>Generate <a href=""></a> Bill Propsosal</Heading>
        <SimpleModal/>
        <Divider />
    </SimpleSidebar>
    </>
    
  );
  
  export default Generate;