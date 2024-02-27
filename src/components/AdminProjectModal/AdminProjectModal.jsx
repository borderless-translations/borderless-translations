import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Select, MenuItem, TextField, FormControl, InputLabel, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

function AdminProjectModal({ closeModal, defaultValues }) {
  const dispatch = useDispatch();
  const contractors = useSelector(store => store.allContractors);
  const clients = useSelector(store => store.allClients);
  const languages = useSelector(store => store.allLanguages);
  const services = useSelector(store => store.allServices);

  // Ensure that project is initialized with defaultValues or an empty object
  const [project, setProject] = useState(defaultValues || {
    admin_id: "",
    client_id: "",
    description: "",
    duration: "",
    due_at: null,
    project_id: "",
    from_language_id: "",
    to_language_id: "",
    contractor_id: "",
    proofreader_id: "",
    service_id: "",
    file_link: '',
  });

  let currentDate = new Date();

  const handleChangeFor = (key, value) => {
    console.log('contractor id', project.contractor_id)
    setProject({ ...project, [key]: value });
  };

  const handleDateChange = (e) => {
    setProject({ ...project, due_at: e.$d });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('PROJECT IS ', project)
    if (defaultValues === null) {
      dispatch({ type: 'CREATE_NEW_PROJECT', payload: project });
      console.log("Sent project information to server");
    } else {
      dispatch({ type: "UPDATE_PROJECT", payload: [project, project.id] });
      console.log("Updated project information on server", project);
    }
    setProject({
      admin_id: "",
      client_id: "",
      description: "",
      duration: "",
      due_at: null,
      project_id: "",
      from_language_id: "",
      to_language_id: "",
      contractor_id: "",
      proofreader_id: "",
      service_id: "",
      file_link: ''
    });
    closeModal();
  };

  const buttonStyle = {
    backgroundColor: '#48a6cd',
    color: 'white',
    "&:hover": {
        backgroundColor: '#332c7b'
    },
    fontSize: '14px',
    marginBottom: '10px'
  }

  useEffect(() => {
    dispatch({ type: 'GET_ALL_CLIENTS' });
    dispatch({ type: 'GET_ALL_LANGUAGES' });
    dispatch({ type: 'GET_ALL_SERVICES' });
    dispatch({ type: 'GET_ALL_CONTRACTORS' })
  }, []);

  return (
    <div className="modal-container" onClick={(e) => {
      if (e.target.className === "modal-container") closeModal();
    }}>
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <Stack direction='column'>
          <Stack direction='row'>
            <Stack direction='column' sx={{margin: '0px 20px'}}>
              <FormControl sx={{ width: '400px', margin: '20px 0' }}>
                <InputLabel id="client-select-label">Client</InputLabel>
                <Select
                  labelId="client-select-label"
                  label="Client"
                  value={project.client_id}
                  onChange={(event) => handleChangeFor("client_id", event.target.value)}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {clients.map((client) => (
                    <MenuItem key={client.id} value={client.id}>{client.client}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Project Name"
                sx={{ width: '400px', margin: '20px 0' }}
                value={project.description}
                onChange={(event) => handleChangeFor("description", event.target.value)}
              />
              <TextField
                label="Duration"
                sx={{ width: '400px', margin: '20px 0' }}
                value={project.duration}
                onChange={(event) => handleChangeFor("duration", event.target.value)}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker sx={{ width: '400px', margin: '20px 0' }}
                  label="Due Date"
                  name="date"
                  defaultValue={dayjs(currentDate)}
                  onChange={handleDateChange}
                />
              </LocalizationProvider>
              <FormControl sx={{ width: '400px', margin: '20px 0' }}>
                <InputLabel id="select-from-language">From Language</InputLabel>
                <Select
                  labelId="select-from-language"
                  label="From Language"
                  value={project.from_language_id}
                  onChange={(event) => handleChangeFor("from_language_id", event.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {languages.map((language) => (
                    <MenuItem key={language.id} value={language.id}>{language.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <Stack direction='column' sx={{margin: '0px 20px'}}>
              <FormControl sx={{ width: '400px', margin: '20px 0' }}>
                <InputLabel id="select-to-language">To Language</InputLabel>
                <Select
                  labelId="select-to-language"
                  label="To Language"
                  value={project.to_language_id}
                  onChange={(event) => handleChangeFor("to_language_id", event.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {languages.map((language) => (
                    <MenuItem key={language.id} value={language.id}>{language.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ width: '400px', margin: '20px 0' }}>
                <InputLabel id="select-translator">Translator</InputLabel>
                <Select
                  labelId="select-to-language"
                  label="To Language"
                  value={project.translator_id}
                  onChange={(event) => handleChangeFor("contractor_id", event.target.value)}
                >
                  <MenuItem value="">
                    <em>Choose translator</em>
                  </MenuItem>
                  {contractors.map((contractor) => (
                    <MenuItem key={contractor.id} value={contractor.id}>{contractor.contractor_name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ width: '400px', margin: '20px 0' }}>
                <InputLabel id="select-proofreader">Proofreader</InputLabel>
                <Select
                  labelId="select-to-language"
                  label="To Language"
                  value={project.proofreader_id}
                  onChange={(event) => handleChangeFor("proofreader_id", event.target.value)}
                >
                  <MenuItem value="">
                    <em>Choose proofreader</em>
                  </MenuItem>
                  {contractors.map((proofreader) => (
                    <MenuItem key={proofreader.id} value={proofreader.id}>{proofreader.contractor_name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ width: '400px', margin: '20px 0' }}>
                <InputLabel id="service-select-label">Service</InputLabel>
                <Select
                  labelId="service-select-label"
                  label="Service"
                  value={project.service_id}
                  onChange={(event) => handleChangeFor("service_id", event.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {services.map((service) => (
                    <MenuItem key={service.id} value={service.id}>{service.type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="File Link"
                sx={{ width: '400px', margin: '20px 0' }}
                value={project.file_link}
                onChange={(event) => handleChangeFor("file_link", event.target.value)}
              />
            </Stack>
          </Stack>
            <Button className='btn btn_sizeSm' sx={buttonStyle} variant='contained' disableRipple type="submit">
              Save
            </Button>
          </Stack>
        </form>
      </div>
    </div >
  );
};

export default AdminProjectModal;
