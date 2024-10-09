import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
function BusinessCards() {
    const [businesses, setBusinesses] = useState([]);
    const [error, setError] = useState(null);

    // Fetch business data on component mount
    useEffect(() => {
        axios.get("http://localhost:8080/bizwy/saveFormData.php")
            .then(response => {
                const data = response.data;
                if (data.success) {
                    setBusinesses(data.data);
                } else {
                    setError(data.message);
                }
            })
            .catch(error => {
                setError("Error fetching data");
                console.error('Error:', error);
                
            });
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="business-card-container">
            {businesses.map((business, index) => (
                <div key={index} className="business-card">
                    <img
                        src={`http://localhost:8080/bizwy/${business.profileBanner}`}
                        alt={`${business.businessName} banner`}
                        className="business-banner"
                    />
                    <div className="business-details">
                        <h3>{business.businessName}</h3>
                        <p><strong>Branch Type:</strong> {business.branchType}</p>
                        <p><strong>Address:</strong> {business.address}</p>
                        <p><strong>State:</strong> {business.state}</p>
                        <p><strong>City:</strong> {business.city}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BusinessCards;
