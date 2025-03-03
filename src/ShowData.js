import React, { useState, useEffect } from 'react';
import './ShowData.css';

const ShowData = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/data')
            .then(response => response.json())
            .then(result => setData(result.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="container">
            <h2>User List</h2>
            {data.length === 0 ? (
                <p className="no-data">No users found.</p>
            ) : (
                <div className="table-container">
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Education</th>
                                <th>Contact</th>
                                <th>College</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.education}</td>
                                    <td>{user.contact}</td>
                                    <td>{user.college}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ShowData;
