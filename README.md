# Code Overview 
### for code review

The primary parts of the code are located in the "src" folder. The root file is App.tsx, which contains routing, global state, and authentication logic. The containers folder has the typescript files that make up the structure of each of the webpages. The "List" container is used to structure the Grocery List and Pantry List pages. The Search.tsx file corresponds to the Recipe Search Page and Saved.tsx is for the Saved Recipes Page. The Login and Landing files handle initial user interaction and authentication.  

The Components folder makes up the repeated parts of each web page. Nav is used on every page except for the landing page to navigate to difference pages. The Recipe.tsx file is used for the structure and functionality of the recipe cards that appear on the Recipe Search and Saved Recipe Pages. The ListItem and AddItemForm files are used within the List pages to display ingredient information and create new ingredients. 
