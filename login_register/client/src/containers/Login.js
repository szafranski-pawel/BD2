import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import { useAppContext } from "../libs/contextLib";
import { useHistory } from "react-router-dom";
import { useFormFields } from "../libs/hooksLib";

export default function Login() {
  const history = useHistory();
  const { userHasAuthenticated } = useAppContext();
  const { adminLoggedIn } = useAppContext();
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
    };
    fetch('http://localhost:5000/api/login', requestOptions).then(async response => {
      const data = await response.json();

      if (data.message === "No such user" || data.message === "Wrong password"){
        alert(data.message);
      }
      else{
        userHasAuthenticated(true);
        if (data.type === "admin"){
          adminLoggedIn(true);
        }
        else {
          adminLoggedIn(false);
        }
        history.push("/");
      }
    }).catch(error => {
        alert(error);
    });
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}
