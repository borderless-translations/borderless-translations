import { useDispatch, useSelector } from 'react-redux';

function AdminContractorDetailsPage() {

    const dispatch = useDispatch();
    const contractorDetails = useSelector(store => store.contractor);

    return (
        <>
            <h1>Admin Contractor Details View</h1>
            {JSON.stringify(contractorDetails)}
        </>
    )
}

export default AdminContractorDetailsPage;