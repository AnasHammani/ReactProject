import { ListeUtilisateur } from 'data/ListeUtilisateur'
import { React, useState } from 'react'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";



export default function Utilisateur2() {

  var tableGrid = ListeUtilisateur;



  const rows =


    tableGrid.map((table, index) => (

      {
        id: index, col1: index, col2: table.nom, col3: table.prenom, col4: table.email, col5: table.gsm,
        col6: table.autoriser,col7 :''
      }

    ));


  const columns = [
    { field: 'col1', headerName: '#', width: 150 },
    { field: 'col2', headerName: 'Nom', width: 150 },
    { field: 'col3', headerName: 'Prenom', width: 150 },
    { field: 'col4', headerName: 'Email', width: 150 },
    { field: 'col5', headerName: 'Gsm', width: 150 },
    {
      field: 'col6', headerName: 'Autoriser', width: 150, renderCell: (params) => {

        return (

          params.row.col6 === "oui" ?

            <div>
              <AiOutlineCheck color="green" fontSize="1.5em" />
            </div> :

            <div>
              <AiOutlineClose color="red" fontSize="1.5em" />
            </div>
        );

      }
    },
    
    { field: 'col7', headerName: 'Action', width: 150,renderCell:(params)=>{

      return(

        <div>
          <AiFillDelete color="red" fontSize="1.5em"/>
          <AiFillEdit color="green" fontSize="1.5em"/>

        </div>
      );
    } },
  ];

  
  return (

    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
      
    </div>
  )
}
