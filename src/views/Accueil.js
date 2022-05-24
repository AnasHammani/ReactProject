import React, { useEffect, useState } from "react"

// react-bootstrap components
import {
  Card,
  Container,
  Row,
  Col,
  ListGroup,
  Alert
} from "react-bootstrap";

import UserInfos from "./UserInfos.js"
import UserContextProvider from "../Context/UserContext";
import ListeTache from "./ListeTache.js";

function Dashboard(props) {




  return (
    <>

      <Container fluid>
        <Row>
          <Col md="12">

         

            <UserContextProvider>
              <UserInfos langueUserInfos ={props.langueAccueil} />
            </UserContextProvider>




          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">
                  {props.langueAccueil.tasks}
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <ListGroup as="ul">


                  <ListeTache langueListeTache ={props.langueAccueil} />

                  {/* {ListeTache.map((liste) => (
                     
                     {liste}
                  ))} */}

                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>





      </Container>

    </>
  );
}

export default Dashboard;
