import React from 'react';
import { useState, useEffect } from "react";

import {
  Card,
  Form,
  Button
} from "react-bootstrap";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';


export default function Inscription() {

  const [mail, setMail] = useState("");
  const [pwd, setPwd] = useState("");

  const [validMail, setValidMail] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [incr, setIncr] = useState(0);

  useEffect(() => {

    console.log("dans le useEffect");

    if (incr > 0) {

      checkForm();
    }

  }, [mail, pwd]);

  function checkForm() {
    // Vérifier ici le format

    var str = pwd;
    var emaill = mail;

    if (emaill.match(/^\w{3,}([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) && str.match(/[0-9]/g) && str.match(/[A-Z]/g) &&
      str.length >= 5 && str.match(/[a-z]/g)) {
      setValidMail(false);
      setValidPwd(false);
      return true;



    } else {

      if (emaill.match(/^\w{3,}([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        setValidMail(false);
        setValidPwd(true);

      }


      else if (str.match(/[0-9]/g) && str.match(/[A-Z]/g) && str.length >= 5 && str.match(/[a-z]/g)) {
        setValidPwd(false);
        setValidMail(true);

      }
      else {
        setValidPwd(true);
        setValidMail(true);

      }




      return false;

    }

  }



  function inscrire() {

    setIncr(1);

    if (checkForm()) {

      console.log("inscription ok");
    } else {

      console.log("PAS OK");
    }



  }




  return (


    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{ marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />

        <Typography component="h1" variant="h5">
          Inscription <br /><br />
        </Typography>

        <Card style={{ width: "400px" }}>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Adresse email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" isInvalid={validMail} value={mail} onChange={(e) => setMail(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control type="password" placeholder="Password" isInvalid={validPwd} value={pwd} onChange={(e) => setPwd(e.target.value)} />
              </Form.Group>

              <Button variant="primary" onClick={inscrire} >
                Inscription
              </Button>



            </Form>
          </Card.Body>
        </Card>
      </Box>
    </Container>




  )
}
