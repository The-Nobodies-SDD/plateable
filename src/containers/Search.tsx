import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/esm/Stack';
import Recipes from './Recipes';
import { RecipeProps } from '../App';
import { searchRecipes, generateRecipes } from '../firebase';

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
    const ingredients = ["sugar", "cream", "garlic", "olive oil"]

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
    <Stack direction="vertical" className="col-md-5 mx-auto" gap={3}>
      <Form>
        <Stack direction="horizontal" gap={3} className="justify-content-center align-items-end">
          <div>
            <Form.Label htmlFor="searchInput">
              Search for a recipe
            </Form.Label>
            <Form.Control
              ref={searchRef}
              placeholder="Enter recipe name"
              id="searchInput"
            />
          </div>
          <Button variant="dark" onClick={searchHandler}>Search</Button>
        </Stack>
      </Form>
   
      <Form className="justify-content-center">
        <Button variant="dark" onClick={generateHandler}>Generate</Button>
      </Form>

      {/* displays all recipe items */}
      <Recipes items={recipes}/>

      {/* displays loading indicator only when loading is true */}
      { loading ? <p>Loading</p> : ''}
    </Stack>

  )
}

export default Search;