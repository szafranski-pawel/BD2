import React, { Fragment, useEffect, useState } from "react";
import scooter_pic from './scooter.png';


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
        <th className="text-center" scope="col"></th>
        <th className="text-center" scope="col">Serial number</th>
        <th className="text-center" scope="col">Status</th>
        <th className="text-center" scope="col">Age</th>
        <th className="text-center" scope="col">Latitude</th>
        <th className="text-center" scope="col">Longitude</th>
        <th className="text-center" scope="col"></th>
      </tr>
    </thead>
    <tbody>
      {scooters.map(scooter => (
        <tr key={scooter.id_scooter}>
          <td className="text-center"><img src={scooter_pic} alt="scooter.png"></img></td>
          <td className="text-center align-middle">{scooter.serial_numeric}</td>
          <td className="text-center align-middle">{scooter.conditiontype}</td>
          <td className="text-center align-middle">{scooter.age}</td>
          <td className="text-center align-middle">{scooter.latitude}</td>
          <td className="text-center align-middle">{scooter.longitude}</td>
          <td className="text-center align-middle"><button className="btn btn-success">Book this scooter</button></td>
        </tr>
      ))}
    </tbody>
  </table>
  </Fragment>
    );
};

export default ScooterList;