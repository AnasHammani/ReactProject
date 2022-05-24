import React, { Component, useState } from "react";
import { useLocation, Route, Switch, useHistory } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Sidebar from "components/Sidebar/Sidebar";

import routes from "routes.js";

import Accueil from "views/Accueil.js";
import UserProfile from "views/UserProfile.js";
import Icons from "views/Icons.js";
import Utilisateur from "views/Utilisateur.js";
import Utilisateur2 from "views/Utilisateur2.js";
// import Inscription from "views/Inscription.js";


import sidebarImage from "assets/img/sidebar-3.jpg";

import TradFrench from "../data/TradFrench";
import TradEnglish from "../data/TradEnglish";

import {
	Button
} from "react-bootstrap";


function Admin() {

  const [appLabels, setAppLabels] = useState(TradEnglish);

  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef(null);
  let history = useHistory();

  function changerLangue(langue) {
    console.log(langue);
    if (langue === "EN")
      setAppLabels(TradEnglish);
    else
      setAppLabels(TradFrench);
  }

  function handleClick() {

    
    history.push("/connexion");

  }


  return (
    <>

      {
        localStorage.getItem("user") ?
          <div>

            <div className="wrapper">
              <Sidebar color={color} image={hasImage ? image : ""} routes={routes} langue={appLabels} />
              <div className="main-panel" ref={mainPanel}>
                <AdminNavbar langue={appLabels} changerLangue={changerLangue} />
                <div className="content">
                  <Route path="/accueil" render={() => <Accueil langueAccueil={appLabels} />} />
                  <Route path="/user" component={UserProfile} />
                  <Route path="/icons" component={Icons} />
                  <Route path="/utilisateur" component={() => <Utilisateur langueUtilisateur={appLabels} />} />
                  <Route path="/utilisateur2" component={Utilisateur2} />
                  {/* <Route path="/inscriptions" component={Inscription} /> */}


                </div>
              </div>
            </div>
          </div> :

          <div>

            <h3>veuillez vous connectez</h3> <br /> 


            <Button variant="primary"  onClick={handleClick}>
								se connecter
							</Button>



          </div>





      }
    </>
  );

}


export default Admin;
