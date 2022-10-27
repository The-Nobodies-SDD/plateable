import React, { useRef } from 'react';
import Button from 'react-bootstrap/esm/Button';
import InputGroup from 'react-bootstrap/esm/InputGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Stack from 'react-bootstrap/esm/Stack';

const Search = () => {

  const searchRef = useRef<HTMLInputElement>(null)

  const searchHandler = () => {
    searchRef.current &&  searchRef.current?.value.length ? console.log(searchRef.current.value) : alert("nothing input")
  } 

  const generateHandler = () => {
    console.log("generate")
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

      <p>List of recipes</p>
    </Stack>

  )
}

export default Search;