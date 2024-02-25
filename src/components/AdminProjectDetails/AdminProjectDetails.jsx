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
            <p>Project: Prime Digital Academy</p>
            <p>Translator: Chris Cantoni</p>
            <p>Proofreader: </p>
            <p>From Language: Italian</p>
            <p>To Language: Japanese</p>
            <p>Text To Translate:</p>
            <p>Translator Notes: Having a tough time translating "pasta" into Japanese.</p>
            <p>Service: Voice Over</p>
            <p>Service Notes: How does my voice sound?</p>
            <p>File Linked:</p>
            <p>{project.file_link}</p>
            {/* <p>Sample Data</p> */}
        

        <button button className='btn btn_sizeSm' onClick={() => history.push("/admin/project")}>Return to Project List</button><button button className='btn btn_sizeSm' >Edit</button>
        </div>
    )
}

export default AdminProjectDetails;