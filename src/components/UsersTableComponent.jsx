import React, { useEffect, useState } from "react"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { getUsername, getUsers } from "../services/user.service";
import { Button } from "@mui/material";
import ActionsComponent from "./ActionsComponent";

function renderSwitch(role) {
    switch(role) {
        case 'ROLE_ADMIN':
            return {permission: 'Admin', color: 'black'};
        case 'ROLE_UserEdit':
            return {permission: 'Edit', color: 'blue'}
        case 'ROLE_UserDelete':
            return {permission: 'Delete', color: 'red'}
        case 'ROLE_UserRead':
            return {permission: 'Read', color: 'green'}
        default:
            return null;
    }
}

const columns = [
  { field: 'username', headerName: 'username', width: 200 },
  { field: 'mail', headerName: 'Email', width: 300 },
  { field: 'registrationTime', headerName: 'Registration Time', width: 200},
  { field: 'latestUpdate', headerName: 'latest update ', width: 200},
  { field: 'active', headerName: 'Active ', width: 200},
  { field: 'myrole', headerName: 'Role ', width: 200},
  { field: 'role', 
    renderCell: (cellValues) => {
        return (
            <>
                {
                    cellValues.value.map((role) => 
                        <div key={role.roleName}>
                            <Button style={{ backgroundColor: renderSwitch(role.roleName).color, marginRight: '3px' }} variant="contained">
                                {renderSwitch(role.roleName).permission}
                            </Button>
                        </div>
                    )
                }
            </>   
                
        )
    }, headerName: 'Permissions', width: 500 },
    { headerName: 'Actions', width: 100, 
        renderCell: (cellValues) => {
            return (
                <ActionsComponent username={cellValues.rowNode.id} active={cellValues.row.active} role={cellValues.row.myrole} data={cellValues.row} />
            )
        },
    }];

export default function UsersTableComponent() {
    let email=getUsername();

    const [users, setUsers] = useState([])
    useEffect(()=>{
        getUsers().then((res)=>{
            let data=res.data.map(
                (mydata)=>{
                    if(mydata.myrole=="ROLE_ADMIN"){
                        return {
                            ...mydata,
                            myrole:"ADMIN"
                        }
                    }
                    else{
                        return {
                            ...mydata,
                            myrole:"USER"
                        }
                    }
                 
                    
                  }) 
             let newdata=data.filter(mydata=> mydata.mail!=email)
            setUsers(data)}).catch((err)=>console.log(err))
    },[])

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={users}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );
}