import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import routes from "routes.js";

function Header(props) {

  const location = useLocation();
  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

  let history = useHistory();

  function deconnexion() {
    

    localStorage.removeItem('user');

    history.push('/connexion');

  }
  


  return (


    <Navbar bg="light" expand="lg">
      <Container fluid>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" navbar>

            <Nav.Item>
              
              <select className="form-select" aria-label="Default select example" onChange={(e) => props.changerLangue(e.target.value)}>
                <option >{props.langue.selectLanguage}</option>
                <option value="FR">{props.langue.francais}</option>
                <option value="EN">{props.langue.anglais}</option>
              </select>
              

              <Nav.Link
                className="m-0"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >


                <span className="no-icon" onClick={deconnexion}>{props.langue.logout}</span>
                {/* <Button variant="secondary" size="lg" active onClick={deconnexion}>
                  Log out
                </Button> */}
              </Nav.Link>

            </Nav.Item>

          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default Header;
