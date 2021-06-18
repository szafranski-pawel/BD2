import React from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import "./Signup.css";
import Button from "react-bootstrap/Button";


export default function Signup() {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    name: "",
    surname: "",
    address: "",
  });
  const history = useHistory();
  const { userHasAuthenticated } = useAppContext();

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
    };
    fetch('http://localhost:5000/api/add_customer', requestOptions).then(async response => {
      const data = await response.json();

      if (data.message === "Error"){
        alert(data.message);
      }
      else {
        userHasAuthenticated(true);
        history.push("/");
      }
    }).catch(error => {
        alert("Failed to send /api/add_customer request!", error);
    });
  }

  return (
    <div className="Signup">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" size="lg">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={fields.address}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={fields.name}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="surname">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            type="text"
            value={fields.surname}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="password" size="lg">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword" size="lg">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Sign Up!
        </Button>
        </Form>
    </div>
  );
}