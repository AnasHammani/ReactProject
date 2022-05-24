import { React, useState, useEffect } from 'react'
import { ListeUtilisateur } from "../data/ListeUtilisateur";
import { DataGrid } from '@mui/x-data-grid';
import logo from "assets/img/reactlogo.png";
import { Button } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import { TiTick } from 'react-icons/ti';
import { TiTimes } from 'react-icons/ti';
import { Form, Row, Col } from 'react-bootstrap';


import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";

import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { TableRow } from '@mui/material';

//import { render } from 'node-sass';


export default function Utilisateur(props) {


  const rows =
    ListeUtilisateur.map((liste, index) => (


      {
        id: index, nom: liste.nom, prenom: liste.prenom, email: liste.email, gsm: liste.gsm, autorise: liste.autoriser,
        action: ''
      }


    ))
    ;

  const columns = [
    { field: 'id', headerName: '#', width: 150 },
    { field: 'nom', headerName: props.langueUtilisateur.name, width: 150 },
    { field: 'prenom', headerName: props.langueUtilisateur.firstName, width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'gsm', headerName: props.langueUtilisateur.gsm, width: 150 },
    // {
    //   field: 'autorise', headerName: props.langueUtilisateur.autorised, width: 150
    // },
    {
      field: 'autorise', headerName: props.langueUtilisateur.autorised, renderCell: (params) => (params.row.autorise === 'non' ? <><TiTimes color='red'
        fontSize='1.5em' /></> : <><TiTick color='green' fontSize='1.5em' /></>),
      width: 150
    },

    {
      field: 'action', headerName: 'Action', renderCell: (params) => (<><MdDelete color='red' fontSize='1.5em' onClick={() => handleShow(params)} />
        <AiFillEdit color='green' fontSize='1.5em' onClick={() => handleShowUpdate(params)} /></>), width: 150
    },

  ];

  const [tableUser, setTableUser] = useState(rows);



  const [selectedUser, setSelectedUser] = useState({});

  const [user, setUser] = useState(rows);

  const [erreurInput, setErreurInput] = useState(true);

  const [nomError, setNomError] = useState(true);
  const [prenomError, setPrenomError] = useState(true);
  const [emailError, setEmailError] = useState(true);
  const [gsmError, setGsmError] = useState(true);
  const [autoriseError, setAutoriseError] = useState(true);
  const [incr, setIncr] = useState(0)

  const [onlyDelete, setOnlyDelete] = useState(false);

  const [selectionModel, setSelectionModel] = useState([]);


  useEffect(() => {

    if (incr === 0) {
      console.log("DANS LE IF DU USE EFFECT !!!");
      console.log(user);
      return;

    }

    console.log(user);
    console.log("DANS LE USE EFFECT !!!");
    checkForm();

  }, [user]);

  function deletee() {

    if(onlyDelete===true){
      var rows = tableUser;

      rows = rows.filter(row => row.id !== selectedUser.id);
      setTableUser(rows);
      //setParamModal();
      setOnlyDelete(false);


    }else{

      console.log("MULTIPLE DELETE");

      const selectedIDs=new Set(selectionModel);
      setTableUser((r)=>r.filter((x)=>!selectedIDs.has(x.id)));


      setOnlyDelete(false);

      
    }
  
     
    handleClose();

  }

  


  function checkForm() {

    console.log(user);

    if (user.nom === undefined || user.prenom === undefined || user.gsm === undefined || user.email === undefined) {

      console.log("utilisateur null");

      return false;
    }

    console.log(user.nom);


    if (user.nom.match(/[a-zA-Z]/g) && !user.nom.match(/[0-9]/g) && !user.nom.match(/[\^\$\\\{\}\[\]\(\)\?\#\!\+\*\.\&\é\"\'\§\è\ç\à\-]/g)
      && user.nom.length >= 3 && user.prenom.match(/[a-zA-Z]/g) && !user.prenom.match(/[\^\$\\\{\}\[\]\(\)\?\#\!\+\*\.\&\é\"\'\§\è\ç\à\-]/g)
      && !user.prenom.match(/[0-9]/g) && user.prenom.length >= 3 && user.email.match(/^\w{3,}([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) &&
      user.gsm.match(/^04([0-9]){8}$/)) {

      console.log("format regex ok ");

      setNomError(true);
      setPrenomError(true);
      setEmailError(true);
      setGsmError(true);
      return true;


    } else {

      console.log("format regex PAS ok ");


      if (user.gsm.match(/^04([0-9]){8}$/)) {

        console.log("Format GSM ok ");
        setGsmError(true);

      } else {
        console.log("Format GSM PAS ok ");
        setGsmError(false);

      }

      if (user.email.match(/^\w{3,}([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {

        console.log("Email ok ");
        setEmailError(true);


      } else {
        console.log("Email PAS ok ");
        setEmailError(false);

      }

      if (user.nom.match(/[a-zA-Z]/g) && !user.nom.match(/[0-9]/g) && !user.nom.match(/[\^\$\\\{\}\[\]\(\)\?\#\!\+\*\.\&\é\"\'\§\è\ç\à\-]/g)
        && user.nom.length >= 3) {

        console.log("NOM ok !");
        setNomError(true);

      } else {
        console.log("NOM PAS ok !");
        setNomError(false);

      }
      if (user.prenom.match(/[a-zA-Z]/g) && !user.prenom.match(/[0-9]/g) && !user.prenom.match(/[\^\$\\\{\}\[\]\(\)\?\#\!\+\*\.\&\é\"\'\§\è\ç\à\-]/g)
        && user.prenom.length >= 3) {
        console.log("PRENOM ok !");
        setPrenomError(true);

      } else {
        console.log(" PRENOM PAS ok !");
        setPrenomError(false);
      }


      return false;
    }

  }



  function editt() {
    console.log("DANS LE EDIT 1ERE FOIS");
    setIncr(incr + 1);

    if (checkForm()) {

      var temp = [...tableUser];

      temp = temp.map((userr, index) =>
        userr.id == selectedUser.id ? {
          id: user.id, nom: user.nom, prenom: user.prenom, email: user.email,
          gsm: user.gsm, autorise: user.autorise
        } : userr
      );

      setTableUser(temp);
      setModalAfficherUpdate(false);
      handleCloseUpdate();




    }



  }



  const [show, setShow] = useState(false);

  const [showUpdate, setShowUpdate] = useState(false);

  function handleClose() {

    setShow(false);
  }

  function handleCloseUpdate() {

    setModalAfficherAdd(false);
    setModalAfficherUpdate(false);
    setShowUpdate(false);
    user.nom = undefined;
    user.prenom = undefined;
    user.email = undefined;
    user.gsm = undefined;
    user.autorise = undefined;
  }


  function handleShowUpdate(params) {


    // On récupère tout l'objet user sur lequel on clique
    setModalAfficherUpdate(true);
    setSelectedUser(params.row);
    console.log(params.row);
    console.log("DANS LE HANDLESHOWUPDATE");

    setUser({
      id: params.row.id, nom: params.row.nom, prenom: params.row.prenom, email: params.row.email,
      gsm: params.row.gsm, autorise: params.row.autorise
    });

    console.log("user : " + user);

    setShowUpdate(true);
  }


  function handleShow(params) {

    console.log("JE SUIS LA MTN ");
    console.log(params);
    setOnlyDelete(true);
    setSelectedUser(params.row);
    setShow(true);

  }

  function handleShowMultipe() {
    setOnlyDelete(false);

    setShow(true);


  }

  function handleShowAdd() {
    setModalAfficherAdd(true);

    console.log("dans le handleShowAdd");
    setSelectedUser({ id: null, nom: null, prenom: null, email: null, gsm: null, autorise: null });
    console.log(selectedUser);
    setShowUpdate(true);

  }


  function addUser() {
    setIncr(incr + 1);


    console.log("dans le add");
    console.log(user.nom);

    if (checkForm()) {
      console.log("DANS LE IF DE ADD USER");

      var autoriser = user.autorise;

      if (autoriser === undefined) {

        autoriser = "non";

      } else {
        autoriser = "oui";
      }

      var table = [...tableUser];
      table.push({ id: table.length, nom: user.nom, prenom: user.prenom, email: user.email, gsm: user.gsm, autorise: autoriser });
      //  table ={id : 3, nom :user.nom,prenom : user.prenom , email : user.email , gsm : user.gsm , autorise : user.autorise};
      setTableUser(table);
      setModalAfficherAdd(false);
      setShowUpdate(false);
      setIncr(incr - 1);
      user.nom = undefined;
      user.prenom = undefined;
      user.email = undefined;
      user.gsm = undefined;
      user.autorise = undefined;

    }

    else {
      console.log("je suis pas censé rentrer dans ce elsa !!!!!!!!");
      // setShowUpdate(false);

    }



  }

  const [modalAfficherAdd, setModalAfficherAdd] = useState(false);
  const [modalAfficherUpdate, setModalAfficherUpdate] = useState(false);


  return (

    <div>
      <button type="button" className="btn btn-outline-dark" onClick={() => handleShowAdd()} >Ajouter user</button>

      <IconButton onClick={handleShowMultipe}>
        <DeleteIcon />
      </IconButton>


      <div style={{ height: 300, width: '100%' }}>
        <DataGrid rows={tableUser} columns={columns} checkboxSelection onSelectionModelChange={
          (ids) => {

            setSelectionModel(ids);
          }
        } />
      </div>

      <>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> {onlyDelete === true ? selectedUser.nom + ' ' + selectedUser.prenom + ' ,' : ''} Etes vous sûr de supprimer ?</Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Annuler
            </Button>
            <Button variant="primary" onClick={deletee}>
              Supprimer
            </Button>
          </Modal.Footer>
        </Modal>
      </>

      <>

        <Modal show={showUpdate} onHide={handleCloseUpdate} size="lg">
          <Modal.Header closeButton>
            {/* <Modal.Title> {selectedUser.nom} {selectedUser.prenom} , etes vous sur de vouloir faire des modifications  ?</Modal.Title> */}

            <Modal.Title>
              {modalAfficherUpdate === true ? <> {selectedUser.nom} {selectedUser.prenom} , etes vous sur de vouloir faire des modifications  ?</>
                : <>Ajouter un nouvel utilisateur</>}

            </Modal.Title>

          </Modal.Header>


          <Modal.Body>
            <Form>

              {modalAfficherAdd ?

                <></>

                : <Form.Group className="mb-3" controlId="formId">

                  <Form.Label>ID</Form.Label>
                  <Form.Control type="text" defaultValue={selectedUser?.id} disabled />

                </Form.Group>


              }


              <Row>

                <Form.Group as={Col} className="mb-3" controlId="formBasicNom">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control type="text" defaultValue={selectedUser?.nom} isInvalid={!nomError} onChange={(e) => { setUser({ ...user, nom: e.target.value }) }}
                  />


                </Form.Group>

                <Form.Group as={Col} className="mb-3" controlId="formBasicPrenom">
                  <Form.Label>Prenom</Form.Label>
                  <Form.Control type="text" defaultValue={selectedUser?.prenom} isInvalid={!prenomError} onChange={(e) => setUser({ ...user, prenom: e.target.value })} />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="text" defaultValue={selectedUser?.email} isInvalid={!emailError} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                </Form.Group>

                <Form.Group as={Col} className="mb-3" controlId="formBasicGsm">
                  <Form.Label>Gsm</Form.Label>
                  <Form.Control type="text" defaultValue={selectedUser?.gsm} isInvalid={!gsmError} onChange={(e) => setUser({ ...user, gsm: e.target.value })} />
                </Form.Group>
              </Row>
              <Form.Group className="mb-3" controlId="formBasicAutoriser">
                <Form.Label>Autorisé : </Form.Label>
                <input type="checkbox" checked={user?.autorise === "oui" ? true : false} onChange={user?.autorise === "oui" ? (e) => setUser({ ...user, autorise: "non" }) : (e) => setUser({ ...user, autorise: "oui" })} />

              </Form.Group>

              <Button variant="secondary" onClick={handleCloseUpdate}>Annuler</Button>
              {modalAfficherAdd ?
                <Button variant="primary" onClick={addUser} >Ajouter</Button>

                :
                <Button variant="primary" disabled={nomError && prenomError && gsmError && emailError ? false : true} onClick={editt}>Modifier</Button>

              }


            </Form>
          </Modal.Body>


        </Modal>
      </>

    </div>
  )
}


