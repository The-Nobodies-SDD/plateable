import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';

import Stack from 'react-bootstrap/esm/Stack';
import Recipes from './Recipes';
import Recipe from '../components/Recipe';
import axios from 'axios';


type RecipeProps = {
  info:{id: string,
  title: string,
  image: string,
  missingIng: string[]}
}

type SearchProps = {
  setSaved: React.Dispatch<React.SetStateAction<RecipeProps[]>>
}

const Search = (props:SearchProps) => {

  type RecipeInfo = {
    id: string,
    title: string,
    image: string,
    missingIng: string[]
  }

  const searchRef = useRef<HTMLInputElement>(null);
  const [recipes, setRecipes] = useState<RecipeInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const searchHandler = () => {
    if (!(searchRef.current && searchRef.current?.value.length)) {
      alert("Nothing input")
      return
    }

    const options = {
      method: 'GET',
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
      params: {
        query: searchRef.current.value,
        
      },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
      }
    };

    axios.request(options)
      .then(res => {
        // console.log(res.data)
        setRecipes(res.data.results)
      })
  } 

  const generateHandler = () => {
    setLoading(true)

    const ingredients = ["chicken breast", "salt"]
    const ingJoin = ingredients.join()


    // NO MORE THAN 500 API CALLS IN A SINGULAR DAY
    const options = {
      method: 'GET',
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
      params: {
        ingredients: ingJoin,
        number: '5',
        ignorePantry: 'true',
        ranking: '1'
      },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
      setRecipes(response.data)
      setLoading(false)
    }).catch(function (error) {
      console.error(error);
    });
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

      <Recipes></Recipes>

      {
        recipes.length === 0 ? '' : 
          recipes.map(el => <Recipe info={{id: el.id, title: el.title, image: el.image, missingIng: []}}/>)
      }

      { loading ? <p>Loading</p> : ''}
    </Stack>

  )
}

export default Search;