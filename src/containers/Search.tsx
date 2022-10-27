import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import InputGroup from 'react-bootstrap/esm/InputGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Stack from 'react-bootstrap/esm/Stack';
import Recipes from './Recipes';
import axios from 'axios';

const Search = () => {

  type RecipeInfo = {
    idMeal: string,
    strMeal: string,
    strMealThumb: string
  }


  const searchRef = useRef<HTMLInputElement>(null);
  const [recipes, setRecipes] = useState<RecipeInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const searchHandler = () => {
    searchRef.current &&  searchRef.current?.value.length ? console.log(searchRef.current.value) : alert("nothing input")
  } 

  const generateHandler = () => {
    setLoading(true)

    const ingredients = ["chicken_breast", "salt"]
    const ingJoin = ingredients.join()


    // NO MORE THAN 100 API CALLS IN A SINGULAR DAY
    const options = {
      method: 'GET',
      url: 'https://themealdb.p.rapidapi.com/filter.php',
      params: {i: ingJoin},
      headers: {
        'X-RapidAPI-Key': '1a40111e03msh68814bdc8d82a07p1fc11ajsnd4965350acd5',
        'X-RapidAPI-Host': 'themealdb.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
      setRecipes(response.data.meals)
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
          recipes.map(el => <p>{el.strMeal}</p>)
      }

      { loading ? <p>Loading</p> : ''}
    </Stack>

  )
}

export default Search;