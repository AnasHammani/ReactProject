import { React, useState, useEffect } from 'react'
import { DataTache } from '../data/DataTache'
import {

  ListGroup,
  Form,
  Group,
  Label,
  Control,
  Text,
  Button,
  Check

} from "react-bootstrap";
//import { appendFile } from 'gulp-append-prepend';


export default function ListeTache(props) {

  const [inputTache, setInputTache] = useState("");

  const [data, setData] = useState([]);




  useEffect(() => {

    fetch('http://localhost:4000/tasks/')
      .then(response => {

        return response.json();

      })
      .then(data1 => {

        setData(data1);
      })

  }, [])

  function addTache() {

    const requestAdd = {

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task_name: inputTache, done: false })
    };

    fetch('http://localhost:4000/tasks/addTask', requestAdd)
      .then(response => response.json())

    var nouveauTableau = data ;
    nouveauTableau.push({ task_name :inputTache , done : false});
    setData([...nouveauTableau]);
    setInputTache("");

    

  }


  function supprimerTache(id_tache) {

    const requestRemove = {

      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({_id: id_tache})
    };

    fetch('http://localhost:4000/tasks/deleteTask', requestRemove)
      .then(response => response.json())

      var nouveauTableauRemove = data;
      nouveauTableauRemove = nouveauTableauRemove.filter(item => item._id !== id_tache);
      setData([...nouveauTableauRemove]);

  }


  function autoriserTache(id_tache) {

    const requestUpdate = {

      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({_id: id_tache , done : true})
    };
    

    fetch('http://localhost:4000/tasks/updateTask', requestUpdate)
      .then(response => response.json())

      
      var nouveauTableauUpdate = data;
      var objIndex = nouveauTableauUpdate.findIndex((obj => obj._id==id_tache));
      nouveauTableauUpdate[objIndex].done = true;
      //nouveauTableauUpdate[{_id : id_tache}].done = true;
      setData([...nouveauTableauUpdate]);




  }


  
  return (

    <div>



      {data.map((tache, id) => (

        //<div>{tache.titre} </div>

        <ListGroup.Item key={id} as="li" className="d-flex justify-content-between align-items-start" style={tache.done ? { backgroundColor: '#98FB98' } : { backgroundColor: '' }} >
          {tache.task_name}
          <div className="pull-right" role="group" >
            <button type="button" className="btn btn-xs btn-success img-circle" onClick={() => autoriserTache(tache._id)}>&#x2713;</button> <button type="button" className="btn btn-xs btn-danger img-circle" onClick={() => supprimerTache(tache._id)} >&#xff38;</button>
          </div>
        </ListGroup.Item>



      ))}


      <Form>
        <Form.Group className="mb-3" >
          
          <Form.Label>{props.langueListeTache.addTask}</Form.Label>
          
          <Form.Control type="text" placeholder= {props.langueListeTache.titleTask} value={inputTache} onChange={(e) => setInputTache(e.target.value)} />

        </Form.Group>



        <Button variant="primary" type="button" onClick={addTache}>
          {props.langueListeTache.add}
        </Button>
      </Form>


    </div>

  )
}
