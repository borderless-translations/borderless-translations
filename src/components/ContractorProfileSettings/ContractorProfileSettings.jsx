import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./ContractorProfileSettings.css";

function ContractorProfileSettings() {

    const dispatch = useDispatch();
    // const user = useSelector(store => store.user);
    // Dummy data
    const user = {
        name: 'Contractor Name', 
        availability: true, 
        phone: '1 222-333-4455', 
        email: 'email@email.email', 
        timezone: 'UTC -6:00', 
        languagePairs: [],
        skills: [],
        services: [],
        writtenRate: 0,
        minuteRate: 0}

    const [availability, setAvailability] = useState(user.availability);
    const [name, setName] = useState(user.name);
    const [phone, setPhone] = useState(user.phone);
    const [email, setEmail] = useState(user.email);
    const [timezone, setTimezone] = useState(user.timezone);
    const [languagePairs, setlanguagePairs] = useState(user.languagePairs);
    const [skills, setSkills] = useState(user.skills);
    const [services, setServices] = useState(user.services);
    const [writtenRate, setWrittenRate] = useState(user.writtenRate);
    const [minuteRate, setMinuteRate] = useState(user.minuteRate);

    const saveUser = () => {
        let userUpdate = {
            username: name,
            availability: availability,
            phone: phone,
            email: email,
            timezone: timezone,
            languagePairs: languagePairs,
            skills: skills,
            services: services,
            writtenRate: writtenRate,
            minuteRate: minuteRate
        }
        dispatch({ type: 'UPDATE_USER', payload: userUpdate });
    }

    return (
        <div className="container">
            <div className="contractor-contact">
                <h2>Contact Information</h2>
                <p>Availability</p>
                <input type="checkbox" checked={availability} onClick={() => setAvailability(!availability)} />
                <p>Name</p>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <p>Phone</p>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
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
                <h2>Skills</h2>
                <p>Language Pairs</p>
                <select value={languagePairs} onChange={(e) => setlanguagePairs(e.target.value)} >
                    <option value="ENG --> JPN">ENG -- JPN</option>
                    <option value="JPN --> ENG">JPN -- ENG</option>
                </select>
                <p>Skill Set</p>
                <select value={skills} onChange={(e) => setSkills(e.target.value)} >
                    <option value="medical">Medical Translation</option>
                    <option value="literary">Literary Translation</option>
                </select>
                <p>Services</p>
                <select value={services} onChange={(e) => setServices(e.target.value)} >
                    <option value="Subtitles">Subtitles</option>
                    <option value="Interpreting">Interpreting</option>
                </select>
            </div>

            <div className="contractor-rates">
                <h2>Rates</h2>
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