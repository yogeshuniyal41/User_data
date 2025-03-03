import React, { useState, useEffect } from 'react';

const UserData = () => {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        education: '', 
        contact: '', 
        college: '' 
    });

    // Fetch data from backend
    useEffect(() => {
        fetch('http://localhost:3000/data')
            .then(response => response.json())
            .then(result => setData(result.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Handle form input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        
        fetch('http://localhost:3000/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(newData => {
            setData([...data, newData]); // Update UI with new data
            setFormData({ name: '', email: '', education: '', contact: '', college: '' }); // Reset form
        })
        .catch(error => console.error('Error adding data:', error));
    };

    return (
        <div>
            <h2>Data List</h2>
            <ul>
                {data.map((item) => (
                    <li key={item._id}>
                        <strong>{item.name}</strong> - {item.email}, {item.education}, {item.contact}, {item.college}
                    </li>
                ))}
            </ul>

            <h3>Add New Data</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="education"
                    placeholder="Education"
                    value={formData.education}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="contact"
                    placeholder="Contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="college"
                    placeholder="College"
                    value={formData.college}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add Data</button>
            </form>
        </div>
    );
};

export default UserData;
