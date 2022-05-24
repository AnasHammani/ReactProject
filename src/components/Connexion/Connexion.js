import React from "react";
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import {
	Card,
	Form,
	Button
} from "react-bootstrap";
import { mapMultiply } from "chartist";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";




function Connexion() {

	const [mail, setMail] = useState("");
	const [pwd, setPwd] = useState("");

	let history = useHistory();
	
	


	function handleSubmit(e) {
		e.preventDefault();

		// On vérifie APRES que l'utilisateur ait cliqué sur le bouton
		if (checkForm()) {

			if (mail === "anas@hotmail.com" && pwd === "Emmawatson21") {

				let utilisateur = {
					email : mail,
					mdp : pwd,
					nom : "Hammani",
					prenom : "Anas",
					age : "26 ans",
					estAutoriser : "oui"


				}

				//localStorage.setItem('valeur-email', mail);
				//localStorage.setItem('valeur-mdp', pwd);
				localStorage.setItem('user', JSON.stringify(utilisateur));
				

				//console.log(localStorage.length);


				history.push('/accueil');

			} else {

				toast.error(' Email ou mot de passe incorrect !', {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});

			}

			// On affiche que c'est ok
			// Si c'est ok, on vérifie mtn que le bon mdp et le bon password a été rentré 
			// if(mail === anas et mot pwd == emma)
			// } else {
			// On affiche que c'est mzi
		} else {


			toast.error('FORMAT  Email et/ou mot de passe incorrect !', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});

		}

	}

	function checkForm() {
		// Vérifier ici le format

		var str = pwd;
		var emaill = mail;

		if (emaill.match(/^\w{3,}([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
			if (str.match(/[0-9]/g) && str.match(/[A-Z]/g) && str.length >= 5 && str.match(/[a-z]/g))
				return true;

		} else
			return false;
	}

	return (


		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box sx={{ marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />

				<Typography component="h1" variant="h5">
					Connexion <br /><br />
				</Typography>

				{/* de ici */}
				<Card style={{ width: "400px" }}>
					<Card.Body>
						<Form>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Adresse email</Form.Label>
								<Form.Control type="email" placeholder="Enter email" value={mail} onChange={(e) => setMail(e.target.value)} />
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Mot de passe</Form.Label>
								<Form.Control type="password" placeholder="Password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
							</Form.Group>

							<Button variant="primary" type="submit" onClick={handleSubmit}>
								Connexion
							</Button>
							

							
						</Form>
					</Card.Body>
				</Card>
				{/* à la  */}
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
			</Box>

		</Container>
	);
}

export default Connexion;