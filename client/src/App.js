import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import Routes from "./Routes";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./libs/contextLib";
import { useHistory } from "react-router-dom";


function App() {
  const history = useHistory();
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAdmin, adminLoggedIn] = useState(false);
  function handleLogout() {
    userHasAuthenticated(false);
    adminLoggedIn(false);
    history.push("/login");
  }
  function addEmployee() {
    history.push("/add_employee");
  }
  function scooterList() {
    history.push("/scooters");
  }
  function scooterRent() {
    history.push("/rent_scooters");
  }
  return (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <LinkContainer to="/">
          <Navbar.Brand className="font-weight-bold text-muted">
            Grejfrut
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
          {(isAdmin && isAuthenticated) ? (
            <>
            <Nav.Link onClick={addEmployee}>Add Employee</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </>
          ) :
          isAuthenticated ? (
            <>
            <Nav.Link onClick={scooterList}>Scooter List</Nav.Link>
            <Nav.Link onClick={scooterRent}>Rented Scooters</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </>
          ) : (
            <>
              <LinkContainer to="/signup">
                <Nav.Link>Signup</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            </>
          )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated, isAdmin, adminLoggedIn}}>
        <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;