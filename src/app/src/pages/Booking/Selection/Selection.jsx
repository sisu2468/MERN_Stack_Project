import Page from "pages/Page";
import React, { useEffect } from "react";
import "./styles.css";
import axios from "axios";

import { useState } from "react";

// const locations = [
//   // Your JSON data here
//   {
//     Country: "Country1",
//     State: "State1",
//     City: "City1",
//     Locations: "Location1",
//     Floor: [-1, 0, 333, 4],
//   },
//   {
//     Country: "Country1",
//     State: "State1",
//     City: "City1",
//     Locations: "Location2",
//     Floor: [-13, 0, 3, 4],
//   },
//   {
//     Country: "Country1",
//     State: "State1",
//     City: "City2",
//     Locations: "Location3",
//     Floor: [-1, 0, 33, 4],
//   },
//   {
//     Country: "Country2",
//     State: "State3",
//     City: "City3",
//     Locations: "Location4",
//     Floor: [-1, 60, 3, 4],
//   },
//   {
//     Country: "Country1",
//     State: "State2",
//     City: "City2",
//     Locations: "Location5",
//     Floor: [-1, 8, 39, 4],
//   },
//   {
//     Country: "Country1",
//     State: "State2",
//     City: "City4",
//     Locations: "Location6",
//     Floor: [-1, 0, 3, 8],
//   },
//   // ... more data objects
// ];

// const LocationDropdowns = ({ locations }) => {
//   // States for selected values
//   const [selectedCountry, setSelectedCountry] = useState('');
//   const [selectedState, setSelectedState] = useState('');
//   const [selectedCity, setSelectedCity] = useState('');
//   const [selectedFloor, setSelectedFloor] = useState('');
//   const [selectedLocation, setSelectedLocation] = useState('');

//   // Filter states, cities, locations, and floors based on selected country, state, and city
//   const filteredStates = Array.from(
//     new Set(locations.filter(location => location.Country === selectedCountry).map(location => location.State))
//   );
//   const filteredCities = Array.from(
//     new Set(
//       locations
//         .filter(
//           location =>
//             location.Country === selectedCountry && location.State === selectedState
//         )
//         .map(location => location.City)
//     )
//   );
//   const filteredLocations = Array.from(
//     new Set(
//       locations
//         .filter(
//           location =>
//             location.Country === selectedCountry &&
//             location.State === selectedState &&
//             location.City === selectedCity
//         )
//         .map(location => location.Locations)
//     )
//   );
//   const filteredFloors = Array.from(
//     new Set(
//       locations
//         .filter(
//           location =>
//             location.Country === selectedCountry &&
//             location.State === selectedState &&
//             location.City === selectedCity &&
//             location.Locations === selectedLocation
//         )
//         .map(location => location.Floor)
//     )
//   );

//   return (
//     <div>
//       {/* Country dropdown */}
//       <select value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)}>
//         <option value="">Select Country</option>
//         {Array.from(new Set(locations.map(location => location.Country))).map(country => (
//           <option key={country} value={country}>
//             {country}
//           </option>
//         ))}
//       </select>

//       {/* State dropdown */}
//       <select value={selectedState} onChange={e => setSelectedState(e.target.value)}>
//         <option value="">Select State</option>
//         {filteredStates.map(state => (
//           <option key={state} value={state}>
//             {state}
//           </option>
//         ))}
//       </select>

//       {/* City dropdown */}
//       <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
//         <option value="">Select City</option>
//         {filteredCities.map(city => (
//           <option key={city} value={city}>
//             {city}
//           </option>
//         ))}
//       </select>

//       {/* Location dropdown */}
//       <select value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)}>
//         <option value="">Select Location</option>
//         {filteredLocations.map(location => (
//           <option key={location} value={location}>
//             {location}
//           </option>
//         ))}
//       </select>

//       {/* Floor dropdown */}
//       <select value={selectedFloor} onChange={e => setSelectedFloor(e.target.value)}>
//         <option value="">Select Floor</option>
//         {filteredFloors.map(floor => (
//           floor.map(f => (
//             <option key={f} value={f}>
//               {f}
//             </option>
//           ))
//         ))}
//       </select>
//     </div>
//   );
// };

// export default LocationDropdowns;
// import React, { useState } from 'react';
// import './LocationDropdowns.css'; // Import custom CSS file for styling
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for additional styling

const LocationDropdowns = ({ locations }) => {
    // States for selected values
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    //   const [selectedFloor, setSelectedFloor] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");

    // Filter states, cities, locations, and floors based on selected country, state, and city
    const filteredStates = Array.from(
        new Set(
            locations
                .filter((location) => location.country === selectedCountry)
                .map((location) => location.state)
        )
    );
    const filteredCities = Array.from(
        new Set(
            locations
                .filter(
                    (location) =>
                        location.country === selectedCountry &&
                        location.state === selectedState
                )
                .map((location) => location.city)
        )
    );

    const filteredLocations = Array.from(
        new Set(
            locations
                .filter(
                    (location) =>
                        location.country === selectedCountry &&
                        location.state === selectedState &&
                        location.city === selectedCity
                )
                .map((location) => location.name)
        )
    );
    //   const filteredFloors = Array.from(
    //     new Set(
    //       locations
    //         .filter(
    //           (location) =>
    //             location.country === selectedCountry &&
    //             location.state === selectedState &&
    //             location.city === selectedCity &&
    //             location.name === selectedLocation
    //         )
    //         .map((location) => location.floor)
    //     )
    //   );

    return (
        <div className="location-dropdowns-container">
            {/* Country dropdown */}
            <br />
            <select
                className="form-control"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
            >
                <option value="">Select Country</option>
                {Array.from(new Set(locations.map((location) => location.country))).map(
                    (country) => (
                        <option key={country} value={country}>
                            {country}
                        </option>
                    )
                )}
            </select>
            <br />
            {/* State dropdown */}
            <select
                className="form-control"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
            >
                <option value="">Select State</option>
                {filteredStates.map((state) => (
                    <option key={state} value={state}>
                        {state}
                    </option>
                ))}
            </select>
            <br />
            {/* City dropdown */}
            <select
                className="form-control"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
            >
                <option value="">Select City</option>
                {filteredCities.map((city) => (
                    <option key={city} value={city}>
                        {city}
                    </option>
                ))}
            </select>
            <br />
            {/* Location dropdown */}
            <select
                className="form-control"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
            >
                <option value="">Select Location</option>
                {filteredLocations.map((location) => (
                    <option key={location} value={location}>
                        {location}
                    </option>
                ))}
            </select>

            {/* Floor dropdown */}
            {/* <select
                    className="form-control"
                    value={selectedFloor}
                    onChange={(e) => setSelectedFloor(e.target.value)}
                >
                    <option value="">Select Floor</option>
                    {filteredFloors.map((floor) =>
                    floor.map((f) => (
                        <option key={f} value={f}>
                        {f}
                        </option>
                    ))
                    )}
                </select> 
            */}
        </div>
    );
};

const Selection = () => {
    const [locations, setlocations] = useState([]);
    React.useEffect(() => {
        const config = {}
        axios.get('http://localhost:80/api/maps/locations', config, { port: 80 })
            .then((response) => {
                setlocations(response.data);
                // console.log(locations);
            });
    }, []);

    return (
        <>
            <Page full header={"Book your slot"} loading={false} empty={false}>
                <hr />
                <LocationDropdowns locations={locations.locations} />
                <br />
                <center><button type="button" class="btn btn-success">Book</button></center>
            </Page>
        </>
    );
};

export default Selection;
