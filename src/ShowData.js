import React, { useState, useEffect } from 'react';

const ShowData = () => {
    const [data, setData] = useState([]);

    // Fetch data from backend
    useEffect(() => {
        fetch('http://localhost:3000/data')
            .then(response => response.json())
            .then(result => setData(result.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h2>User List</h2>
            {data.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <table border="1">
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
            )}
        </div>
    );
};

export default ShowData;
