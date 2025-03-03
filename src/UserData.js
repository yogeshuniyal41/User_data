import React, { useState, useEffect } from 'react';
import './UserData.css';

const UserData = () => {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', education: '', contact: '', college: '' });

    useEffect(() => {
        fetch('http://localhost:3000/data')
            .then(response => response.json())
            .then(result => setData(result.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch('http://localhost:3000/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(newData => {
            setData([...data, newData]);
            setFormData({ name: '', email: '', education: '', contact: '', college: '' });
        })
        .catch(error => console.error('Error adding data:', error));
    };

    return (
        <div className="container">
            <h2>Data List</h2>
            <ul className="data-list">
                {data.map((item) => (
                    <li key={item._id} className="data-item">
                        <strong>{item.name}</strong> - {item.email}, {item.education}, {item.contact}, {item.college}
                    </li>
                ))}
            </ul>

            <h3>Add New Data</h3>
            <form className="data-form" onSubmit={handleSubmit}>
                {['name', 'email', 'education', 'contact', 'college'].map((field) => (
                    <input
                        key={field}
                        type={field === 'email' ? 'email' : field === 'contact' ? 'number' : 'text'}
                        name={field}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={formData[field]}
                        onChange={handleChange}
                        required
                    />
                ))}
                <button type="submit">Add Data</button>
            </form>
        </div>
    );
};

export default UserData;
