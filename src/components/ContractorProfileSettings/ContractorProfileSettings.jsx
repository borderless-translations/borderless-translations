import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./ContractorProfileSettings.css";

function ContractorProfileSettings() {

    const dispatch = useDispatch();
    const user = useSelector(store => store.contractor);
    const [availability, setAvailability] = useState(user.available);
    const [name, setName] = useState(user.contractor_name);
    const [linkedIn, setLinkedIn] = useState(user.linked_in);
    const [phone, setPhone] = useState(user.phone);
    const [email, setEmail] = useState(user.email);
    const [timezone, setTimezone] = useState(user.timezone);
    const [languages, setlanguages] = useState(user.languages);
    const [skills, setSkills] = useState([]);
    const [services, setServices] = useState(user.services);
    const [writtenRate, setWrittenRate] = useState(user.base_written_rate);
    const [minuteRate, setMinuteRate] = useState(user.base_audio_video_rate);

    // Saves updated contractor settings

    const saveUser = () => {
        let contractorUpdate = {
            contractor_name: name,
            available: availability,
            linked_in: linkedIn,
            phone: phone,
            location: location,
            timezone: timezone,
            base_written_rate: writtenRate,
            base_video_audio_rate: minuteRate
        };
        let userUpdate = {username: email, password: password};

        dispatch({ type: 'UPDATE_CONTRACTOR_SELF', payload: [ user.user_id, contractorUpdate, userUpdate] });
    }

    const addService = (serviceId) => {
        let newService = {
            service_id: serviceId,
            contractor_id: user.user_id
        }

        dispatch({ type: 'ADD_SERVICE_TO_CONTRACTOR', payload: [newService, user.user_id] });
    }

    const deleteService = (serviceId) => {
        dispatch({ type: 'DELETE_SERVICE_FROM_CONTRACTOR', payload: [serviceId, user.user_id] })
    }

    const deleteLanguage = (languageId) => {
        dispatch({ type: 'DELETE_LANGUAGE_FROM_CONTRACTOR', payload: [languageId, user.user_id] })
    }

    const addLanguagePair = (languageIds) => {
        let newLanguagePair = {
            from_language_id: languageIds[0],
            to_language_id: languageIds[1],
            user_id: user.user_id
        }

        dispatch({ type: 'ADD_LANGUAGE_TO_CONTRACTOR', payload: [newLanguagePair, user.user_id] });
    }

    useEffect(() => {
        dispatch({ type: "GET_CONTRACTOR_SELF", payload: user.user_id });
    }, [user.id]);

    return (
        <div className="container">
            <h2>Profile Settings</h2>
            <div className="contractor-contact">
                <h3>Contact Information</h3>
                <p>Availability</p>
                <input type="checkbox" checked={availability} onClick={() => setAvailability(!availability)} />
                <p>Name</p>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <p>LinkedIn</p>
                <input type="text" value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)} />
                <p>Email</p>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <p>Timezone</p>
                <select value={timezone} onChange={(e) => setTimezone(e.target.value)} >
                    <option value="UTC -1:00">UTC -1:00</option>
                    <option value="UTC -2:00">UTC -2:00</option>
                    <option value="UTC -3:00">UTC -3:00</option>
                    <option value="UTC -4:00">UTC -4:00</option>
                    <option value="UTC -5:00">UTC -5:00</option>
                    <option value="UTC -6:00">UTC -6:00</option>
                </select>
            </div>

            <div className="contractor-skills">
                <h3>Skills</h3>
                <p>Language Pairs</p>
                <select multiple onChange={(e) => setlanguages(e.target.value)} >
                    <option value="ENG --> JPN">Japanese → English</option>
                    <option value="JPN --> ENG">English → Japanese</option>
                </select>
                {languages.map((language) => {
                    return <p>{language.from_language}→{language.to_language} <button onClick={() => deleteLanguage(language.id)}>Remove</button></p>
                })}
                <p>Skill Set</p>
                <select multiple onChange={(e) => setSkills(e.target.value)} >
                    <option value="medical">Medical Translation</option>
                    <option value="literary">Literary Translation</option>
                </select>
                <p>Services</p>
                <select multiple value={services} onChange={(e) => setServices(e.target.value)} >
                    <option value="Subtitles">Subtitles</option>
                    <option value="Interpreting">Interpreting</option>
                </select>
                {services.map((service) => {
                    return <p>{service.service_type} <button onClick={() => deleteService(service.id)}>Remove</button></p>
                })}
            </div>

            <div className="contractor-rates">
                <h3>Rates</h3>
                <p>Written</p>
                $<input type="text" value={writtenRate} onChange={(e) => setWrittenRate(e.target.value)} />  per word
                <p>Audio / Video</p>
                $<input type="text" value={minuteRate} onChange={(e) => setMinuteRate(e.target.value)} /> per min.
                <button onClick={saveUser}>Save</button>
            </div>
        </div>
    );
};

export default ContractorProfileSettings;