# Gather-town object data uploader
---
### This script is meant to grab Room (MAP_ID) data from a gathertown space 
## Stuff needed to get started:
- Gathertown Space_ID link (// note the \, NOT / as is in the URL as specified from the gathertown api)
- A Gathertown API_KEY, uses google firebase to get authentcated and then it lets you get a key from gathertown's website
- Go into the Space you linked and get an existing room's ID, right click on the room from within mapbuilder mode and it should give you a 'Copy ID' option. (the ID from what I noticed is a literal string type of the room name, capitalization matters)
- A CSV file in the correct format specified below (this script will go and look for specified objects from the csv and add the data matching from the csv to the room's objects)


## CSV file format:
### MAP_ID, ID, Title, Authors, PDF File, Image File, Summary

Example: ArtGallery, 1001, Why Gundams Are Cool, Edward Cruz|(if more than 1 just add '|' between names)|(another fake name)|(another), PDFs/name-of-pdf.pdf, Images/name-of-img.png, Gundams are just cool in my opinion, thanks for coming to my TED Talk in advance.



# remember to actually read through this all and simplyfy it heavily