import { Button, Heading, Textarea, Text } from "@chakra-ui/react";
import { useState } from "react";
import { SimpleSidebar } from "../components/SimpleSidebar";

const Summerize = () => {

    const [loading, setLoading] = useState(false)
    const [text, setText] = useState("")
    
    const [answer, setAnswer] = useState("")

    function handleSubmit(event){
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        };

        setAnswer("")

        setLoading(true)
        fetch("api/summerize", requestOptions)
            .then((res) => res.json())
            .then((data) => setAnswer(data[0].summary_text))
            .catch((err) => {
                alert(err)
            })
            .finally(() => setLoading(false))
    }

    return(
    <>
        <SimpleSidebar>
            <Heading margin={5}>Summerize a Complicated Bill</Heading>
            <Textarea placeholder='Paste the bill here...' onChange={event => setText(event.currentTarget.value)}/>
            <Button isLoading={loading} margin={5} color="green.400" variant="outline" onClick={handleSubmit}>Submit</Button>

            {answer ? <><Heading>Answer: </Heading>
            <Text>{answer}</Text></> : null}
        </SimpleSidebar>
    </>
    );
}

    
  export default Summerize;