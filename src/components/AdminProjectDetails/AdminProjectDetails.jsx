import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';



function AdminProjectDetails(){

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    useEffect(() => {
        dispatch({ type: "GET_PROJECT", payload: params.id });
    }, [params.id]);



    return(
        <>
        <h1>Hello World</h1>

        <button onClick={() => history.push("/project")}>Return to Project List</button>
        </>
    )
}

export default AdminProjectDetails;