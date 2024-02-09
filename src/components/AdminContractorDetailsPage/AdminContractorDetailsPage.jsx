import { useDispatch, useSelector } from 'react-redux';
import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';

function AdminContractorDetailsPage() {

    const dispatch = useDispatch();
    const { id } = useParams();
    const contractorDetails = useSelector(store => store.contractor);

    const refreshPage = () => {
        dispatch({type: 'GET_CONTRACTOR', payload: id})
    }


useEffect(() => {
    refreshPage();
}, [])

// TODO: Add editability to contractor details page

    return (
        <>
            <h1>Admin Contractor Details View</h1>
            {JSON.stringify(contractorDetails)}
        </>
    )
}

export default AdminContractorDetailsPage;