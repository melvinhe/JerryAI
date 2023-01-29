## JerryAI
Built for the MinneHack 2023
## Inspiration
We were inspired to increase civic engagement and participation in the legislative process. By using AI to help create legislation, the platform aims to make the process more accessible to the average person. It was also a chance for us to experiment with implementing machine learning into a real-life project!
## What is JerryAI
JerryAI, uses Natural Language Processing (NLP) to create legislative bills by analyzing and summarizing a proposed idea by the average Joe. The platform also helps to make complex legislation more accessible to everyone by using NLP to generate easy-to-understand explanations of proposed bills. This allows citizens to participate more in the laws that affect them and for the representatives to understand the community's needs and concerns better. 
## What is does
JerryAI has the ability to write you a mockup proposal for a bill based on the prompt the user provides. Additionally, it analyses deeper, by classifying the bill and its logical grouping. It then summarizes the process of what you would need to do to get this bill into motion, and looks into legislators that would support your bill. It then provides you with contact information (and more!) pertaining to the legislator.
## How we built it
We built the user interface with NextJS as a front-end framework. We used Python with FastAPI in the back end to facilitate using machine learning libraries. We use a couple of models trained from [amazon SageMaker and the new Hugging Face Deep Learning](https://huggingface.co/philschmid/bart-large-cnn-samsum) container, [250k US Congressional bills from 1950-2015](https://huggingface.co/z-dickson/CAP_coded_US_Congressional_bills), a fine-tuned version of the [facebook/bart-large-cnn](https://huggingface.co/facebook/bart-large-cnn) on the billsum dataset and custom tuned version OpenAi's text-davinci-002 machine learning model.
## Challenges we ran into
At the end of our project, we were in a time crunch to implement some of the ideas we had for JerryAI before the deadline. One of our group members also couldn't make it to the event at the last minute so we were also down a person.
## Accomplishments that we're proud of
This is our second Hackathon ever! We are proud of the progress we have made since the first Hack a few months ago. We love the atmosphere, and we plan to be back for more.
## What we learned
New front-end UI library! 
## What's next for JerryAI
JerryAI would likely have high server costs the way it is built. Our laptops take several seconds at a time to run the models. However, we believe that JerryAI could be incredibly useful for creating and finding ways to make the legislative billing process better!
