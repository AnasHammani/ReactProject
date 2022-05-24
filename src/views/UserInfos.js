import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContext'
import {Card} from "react-bootstrap";

export default function UserInfos(props) {

  //var user = JSON.parse(localStorage.getItem('user'))
  const { user } = useContext(UserContext);
  //console.log(user);



  return (


    <Card>
      <Card.Header>
        <Card.Title as="h4">
        {props.langueUserInfos.title} : 
        </Card.Title>
      </Card.Header>

      <Card.Body>
        <p> {props.langueUserInfos.name} : {user?.nom}</p>
        <p>{props.langueUserInfos.firstName} : {user?.prenom}</p>
        <p>{props.langueUserInfos.years} :{user?.age}</p>

        <p>
        {props.langueUserInfos.autorised} :
          <input type="checkbox" value=""  defaultChecked={user?.estAutoriser} /> 
        </p>
      </Card.Body>

    </Card>

  )
}