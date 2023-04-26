import Page from "pages/Page";
import { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";

const LocationDropdowns = ({ locationsarray }) => {
	// States for selected values
	const [locations, setLocations] = useState(locationsarray.locations || []);
	const [selectedCountry, setSelectedCountry] = useState("");
	const [selectedState, setSelectedState] = useState("");
	const [selectedCity, setSelectedCity] = useState("");
	//   const [selectedFloor, setSelectedFloor] = useState("");
	const [selectedLocation, setSelectedLocation] = useState("");

	useEffect(() => {
		setLocations(locationsarray.locations);
	}, [locationsarray]);

	return (
		<>
			{locations && locations.length != 0 ? (
				<div className="location-dropdowns-container">
					{/* Country dropdown */}
					<br />
					<select
						className="form-control"
						value={selectedCountry}
						onChange={(e) => setSelectedCountry(e.target.value)}
					>
						<option value="">Select Country</option>
						{Array.from(
							new Set(locations.map((location) => location.country))
						).map((country) => (
							<option key={country} value={country}>
								{country}
							</option>
						))}
					</select>
					<br />
					{/* State dropdown */}
					<select
						className="form-control"
						value={selectedState}
						onChange={(e) => setSelectedState(e.target.value)}
					>
						<option value="">Select State</option>
						{Array.from(
							new Set(
								locations
									.filter((location) => location.country === selectedCountry)
									.map((location) => location.state)
							)
						).map((state) => (
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
						{Array.from(
							new Set(
								locations
									.filter(
										(location) =>
											location.country === selectedCountry &&
											location.state === selectedState
									)
									.map((location) => location.city)
							)
						).map((city) => (
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
						{Array.from(
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
						).map((location) => (
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
			) : null}
		</>
	);
};

const Selection = () => {
	const [locations, setlocations] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		axios
			.get("/api/maps/locations", {})
			.then((response) => {
				setlocations(response.data);
				setLoading(false);
				// console.log(locations);
			});
	}, []);

	return (
		<>
			<Page full header={"Book your slot"} loading={loading} empty={false}>
				<hr />
				<LocationDropdowns locationsarray={locations} />
				<br />
				<center>
					{loading ? null : (
						<button type="button" className="btn btn-success">
							Book
						</button>
					)}
				</center>
			</Page>
		</>
	);
};

export default Selection;
