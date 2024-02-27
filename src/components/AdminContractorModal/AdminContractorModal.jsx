import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { TextField, Checkbox, Stack, Button, MenuItem } from '@mui/material';
// import '../AdminClientModal/AdminClientModal.css';

function AdminContractorModal({ closeModal, defaultValues }) {

    const dispatch = useDispatch();
    let [contractor, setContractor] = useState(defaultValues);
    const timezoneList = [
        {id: 1, tz: "UTC -11:00 - American Samoa"}, 
        {id: 2, tz: "UTC -10:00 - Honolulu"},
        {id: 3, tz: "UTC -9:00 - Anchorage"}, 
        {id: 4, tz: "UTC -8:00 - Los Angeles"}, 
        {id: 5, tz: "UTC -7:00 - Denver"}, 
        {id: 6, tz: "UTC -6:00 - Chicago"},
        {id: 7, tz: "UTC -5:00 - New York"}, 
        {id: 8, tz: "UTC -4:00 - Halifax"},
        {id: 9, tz: "UTC -3:00 - Rio de Janeiro"}, 
        {id: 10, tz: "UTC -2:00 - Ponta Delgada"}, 
        {id: 11, tz: "UTC -1:00 - Reykjavik"}, 
        {id: 13, tz: "UTC 0:00 - London"}, 
        {id: 14, tz: "UTC +1:00 - Paris"},
        {id: 15, tz: "UTC +2:00 - Helsinki"}, 
        {id: 16, tz: "UTC +3:00 - Moscow"}, 
        {id: 17, tz: "UTC +4:00 - Dubai"}, 
        {id: 18, tz: "UTC +5:00 - Karachi"},
        {id: 19, tz: "UTC +6:00 - Dhaka"}, 
        {id: 20, tz: "UTC +7:00 - Bangkok"},
        {id: 21, tz: "UTC +8:00 - Beijing"}, 
        {id: 22, tz: "UTC +9:00 - Tokyo"}, 
        {id: 23, tz: "UTC +10:00 - Brisbane"}, 
        {id: 24, tz: "UTC +11:00 - Sydney"},
        {id: 25, tz: "UTC +12:00 - Tarawa"},
        {id: 26, tz: "UTC +13:00 - Auckland"}];

    const handleChangeFor = (key, value) => {
        setContractor({ ...contractor, [key]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({ type: "UPDATE_CONTRACTOR", payload: contractor });
        console.log("Updated contractor information on server", contractor);
        Swal.fire({
            title: "Info saved!",
            icon: "success"
          });
          dispatch({type: "GET_CONTRACTOR", payload: contractor.user_id})
        closeModal();
    };

    const buttonStyle = {
        backgroundColor: '#48a6cd',
        color: 'white',
        "&:hover": {
            backgroundColor: '#332c7b'
        },
        marginBottom: '10px'   
    }


    return (
        <div className="modal-container" onClick={(e) => {
            if (e.target.className === "modal-container") closeModal();
        }}>
            <div className="modal">
                <form onSubmit={handleSubmit}>
                    <Stack direction='column'>
                    <Stack direction='row'>
                    <Stack direction='column' sx={{margin: '0px 20px'}}>
                        <div className="form-group">
                            <TextField sx={{width: '400px', margin: '20px 0'}}
                                label="Contractor Name"
                                value={contractor.contractor_name}
                                onChange={(event) => handleChangeFor("contractor_name", event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <TextField sx={{width: '400px', margin: '20px 0'}}
                                label='Phone'
                                value={contractor.phone}
                                onChange={(event) => handleChangeFor("phone", event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <TextField sx={{width: '400px', margin: '20px 0'}}
                                label="Location"
                                value={contractor.location}
                                onChange={(event) => handleChangeFor("location", event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <TextField select sx={{width: '400px', margin: '20px 0'}}
                                label='Timezone'
                                value={contractor.timezone}
                                onChange={(event) => handleChangeFor("timezone", event.target.value)}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            maxHeight: {
                                                xs: '200px'
                                            },
                                            width: 200
                                        }
                                    },
                                    anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "left"
                                    },
                                    transformOrigin: {
                                        vertical: "top",
                                        horizontal: "left"
                                    }
                                }}>
                                {timezoneList.map(timezone => {
                                    return (
                                        <MenuItem 
                                            key={timezone.id} 
                                            value={timezone.tz}>
                                                {timezone.tz}
                                        </MenuItem>
                                    )
                                })}
                            </TextField>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Signed NDA</label>
                            <Checkbox
                                disableRipple
                                checked={contractor.signed_nda}
                                onChange={(event) => handleChangeFor("signed_nda", event.target.checked)}
                            />
                        </div>
                    </Stack>
                    <Stack direction='column'>
                        <div className="form-group">
                            <TextField sx={{width: '400px', margin: '20px 0'}}
                                label='LinkedIn'
                                value={contractor.linked_in}
                                onChange={(event) => handleChangeFor("linked_in", event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <TextField sx={{width: '400px', margin: '20px 0'}}
                                label='Base Written Rate'
                                value={contractor.base_written_rate}
                                onChange={(event) => handleChangeFor("base_written_rate", parseFloat(event.target.value))}
                            />
                        </div>
                        <div className="form-group">
                            <TextField sx={{width: '400px', margin: '20px 0'}}
                                label='Base AV Rate'
                                value={contractor.base_audio_video_rate}
                                onChange={(event) => handleChangeFor("base_audio_video_rate", parseFloat(event.target.value))}
                            />
                        </div>
                        <div className="form-group">
                            <TextField multiline sx={{width: '400px', margin: '20px 0'}}
                                label='Notes'
                                value={contractor.notes}
                                onChange={(event) => handleChangeFor("notes", event.target.value)}
                            />
                        </div>
                    </Stack>
                    </Stack>
                    <Button className='btn btn_sizeSm' variant='contained' disableRipple sx={buttonStyle} type="submit">
                        Save
                    </Button>
                    </Stack>
                </form>
            </div>
        </div>
    );
};

export default AdminContractorModal;