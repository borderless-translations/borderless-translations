import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';



function AdminProjectDetails(){

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const project = useSelector(store => store.project);

    useEffect(() => {
        dispatch({ type: "GET_PROJECT", payload: params.id });
    }, [params.id]);



    return(
        <div className="container"> 
            <h2>Admin Project Details</h2>
            <p>{params.id}</p>
            <p>{project.project_id}</p>
            <p>{project.contractor_id}</p>
            <p>{project.proofreader_id}</p>
            <p>{project.from_language_id}</p>
            <p>{project.to_language_id}</p>
            <p>{project.text_to_translate}</p>
            <p>{project.translator_notes}</p>
            <p>{project.service}</p>
            <p>{project.service_notes}</p>
            <p>{project.file_link}</p>
            <p>Sample Data</p>
        

        <button onClick={() => history.push("/admin/project")}>Return to Project List</button>
        </div>
    )
}

export default AdminProjectDetails;