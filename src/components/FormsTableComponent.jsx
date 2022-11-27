import React, { useEffect, useState } from "react"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { getUsers } from "../services/user.service";
import { Button } from "@mui/material";
import { getAllForms } from "../services/form.service";
import FormActionsComponents from "./FormActionsComponents";
import { useNavigate } from "react-router-dom";


const columns = [
  { field: 'name', headerName: 'Name', width: 350 },
  { field: 'latestUpdate', headerName: 'Latest Update', width: 300 },
  { field: 'active', headerName: 'Active', width: 300 },
    { headerName: 'Actions', width: 100, 
        renderCell: (cellValues) => {
            return (
                <FormActionsComponents formId={cellValues.rowNode.id} active={cellValues.row.active} />
            )
        },
    }];

export default function FormsTableComponent() {
    const [forms, setForms] = useState([])
    const navigate=useNavigate();
    useEffect(()=>{
        getAllForms().then((res)=>(setForms(res.data))).catch((err)=>console.log(err))
    },[])

    return (
        <>
       <div>
  <div class="container">
        <div style={{ height: 500 }}>
        <button type="button" class="btn btn-success btn-lg " onClick={()=>navigate("/createform")}>Create Form</button>
<br></br>
<br></br>

            <DataGrid
                rows={forms}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
        </div></div>
        </>
    );
}