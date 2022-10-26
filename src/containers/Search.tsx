import React, { useRef } from 'react';
import Button from 'react-bootstrap/esm/Button';
import InputGroup from 'react-bootstrap/esm/InputGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

const Search = () => {

  const searchRef = useRef<HTMLInputElement>(null)

  const searchHandler = () => {
    searchRef.current &&  searchRef.current?.value.length ? console.log(searchRef.current.value) : alert("nothing input")
  } 

  return (
    <div>
      <Form>
        <Form.Control
          ref={searchRef}
          placeholder="Search for a recipe"
        />
        <Button variant="dark" onClick={searchHandler}>Search</Button>
      </Form>
      <Form>
        <Button variant="dark">Generate</Button>
      </Form>
    </div>
  )
}

export default Search;