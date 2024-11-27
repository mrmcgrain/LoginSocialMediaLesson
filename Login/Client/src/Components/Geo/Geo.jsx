
import React, { useState, useEffect } from "react";

 const Geo = () => {
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [error, setError] = useState(null);


useEffect(() => {
    getLocation()
}, [])




    const getLocation = () => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                setError(null);
            },
            (err) => {
                setError(err.message);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    };

    return (
        <div>
            {console.warn(navigator.geolocation)}
            {/* <button onClick={getLocation}>Get Location</button> */}
            {location.latitude && location.longitude && (
                <p>
                    Latitude: {location.latitude}, Longitude: {location.longitude}
                </p>
            )}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default Geo