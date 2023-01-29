from datetime import date
 
# Returns the current local date
today = date.today()
print("Today date is: ", today)




def generateIntro():
    today = date.today()


    message = {"message": """

    {today}\n
    (officials name)\n
    (officials title)\n
    (officials commitee)\n
    (officials address)\n
    (officials city, state and zip code)\n\n
    

    
    
    """}
    


