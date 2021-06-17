import React, { Fragment, useEffect, useState } from "react";

const ScooterList = () => {

  const [scooters, setScooters] = useState([]);
    const getScooters = async() => {
        try {
            
            const response = await fetch("http://localhost:5000/scooters");
            const jsonData = await response.json();
            
            setScooters(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getScooters();
    }, []);

    return (<Fragment>
        <h1 className = "text-center mt-5">Available Scooters near Your Location</h1>
        <table class="table table-striped table-bordered mt-5">
    <thead>
      <tr>
        <th scope="col">Serial number</th>
        <th scope="col">Status</th>
        <th scope="col">Age</th>
        <th scope="col">Latitude</th>
        <th scope="col">Longitude</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      {scooters.map(scooter => (
        <tr key={scooter.ID_SCOOTER}>
          <td>{scooter.SERIAL_NUMERIC}</td>
          <td>{scooter.CONDITIONTYPE}</td>
          <td>{scooter.AGE}</td>
          <td>{scooter.LATITUDE}</td>
          <td>{scooter.LONGITUDE}</td>
          <td><button className="btn btn-success">Book this scooter</button></td>
        </tr>
      ))}
    </tbody>
  </table>
  </Fragment>
    );
};

export default ScooterList;