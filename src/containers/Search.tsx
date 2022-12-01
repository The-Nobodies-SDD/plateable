import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/esm/Stack';
import Container from 'react-bootstrap/esm/Container';
import Recipes from './Recipes';
import { RecipeProps } from '../App';
import { searchRecipes, generateRecipes } from '../firebase';
import { useAppSelector } from '../app/hooks';
import { selectPantry } from '../features/pantry/pantrySlice';
import { Ingredient } from './List';

import Spinner from 'react-bootstrap/Spinner';

// page which allows users to search for and generate recipes
const Search = () => {

  // format of data that is received from api
  type RecipeReturnType = {
    id: string,
    title: string,
    image: string,
    missingIng: string[]
  }
  
  // ref to keep track of the search bar input
  const searchRef = useRef<HTMLInputElement>(null);

  // state to keep track of all current recipes
  const [recipes, setRecipes] = useState<RecipeProps[]>([]);

  // state used to display when a query is loading
  const [loading, setLoading] = useState<boolean>(false);

  const pantryGlobal:Ingredient[] = useAppSelector(selectPantry);

  // handler for when a user searches for a recipe
  const searchHandler =  () => {

    // displays loading indicator
    setLoading(true)

    // alerts user if they did not input anything into the search bar
    if (!(searchRef.current && searchRef.current?.value.length)) {
      alert("Nothing input")
      return
    }

    searchRecipes({query:searchRef.current.value})
      .then((res) => {
        if (!typeof res.data) {
          return
        }


        let data: any = res.data;
        
        // reformats the data from the api to the format used around the application
        const reshaped = data.map((el:any) => (
          {info: {...el}}
        ))

        setRecipes(reshaped)
        setLoading(false)
        console.log(reshaped)
      })
      .catch(err => {
        console.error(err);
      })
  } 

  // handler for when a user generates recipes 
  const generateHandler = () => {

    // displays loading indicator
    setLoading(true)

    // placeholder pantry list 
    const ingredients = pantryGlobal.map( el => {
      return el.name
    })

    // concatenates entire pantry list into one string
    const ingJoin = ingredients.join()


    generateRecipes({ingredients: ingJoin})
      .then(res => {

        if (!typeof res.data) {
          return
        }

        let data: any = res.data;

        // reformats the data from the api to the format used around the application
        const reshaped = data.map((el:RecipeReturnType) => (
          {info: {...el}}
        ))

        setRecipes(reshaped)
        setLoading(false)
      })
      .catch(err => {
        console.error(err);
      })
  }

  return (
    <Stack direction="vertical" style={{display: "block", marginTop: "2rem"}} className="justify-content-center" gap={3}>
      <Form style={{height:"100px", marginBottom: "1rem"}}>
        <Stack direction="horizontal" gap={3} className="justify-content-center align-items-end">
          <Stack direction="horizontal" gap={3} className="justify-content-center align-items-end">
            <div>
              <Form.Label htmlFor="searchInput">
                Search for a recipe:
              </Form.Label>
              <Form.Control
                ref={searchRef}
                placeholder="Enter recipe name"
                id="searchInput"
              />
            </div>
          <Button variant="dark" onClick={searchHandler}>Search</Button>
          </Stack>

          <div>
            <p style={{display: 'inline', marginRight: "20px"}}>
              <strong>OR</strong> &nbsp;&nbsp;Generate a recipes based on the items in your pantry
            </p>
            <Button variant="dark" onClick={generateHandler}>Generate Recipes</Button>
          </div>
        </Stack>
      </Form>

      {/* displays all recipe items */}
      <Container>
        {recipes.length === 0 ? <p className="recipes__msg"><em>Nothing to show yet...</em></p> : <Recipes items={recipes}/>}
      </Container>

      {/* displays loading indicator only when loading is true */}
      { loading ? <Spinner animation="border" style={{top:"0", bottom:"0", left: "0", right:"0", margin:"auto", textAlign:"center", zIndex: 10}}  />: ''}
    </Stack>

  )
}

export default Search;