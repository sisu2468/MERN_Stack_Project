import { useContext, useState } from "react";
import Page from "pages/Page";
import NewSubGreddiit from "components/NewSubGreddiit";
import React, { useEffect } from "react";
import "./styles.css";
import { useFormik } from "formik";
import Select from "react-select";
import csc from "country-state-city";

// navbar
// import { NavigationContext } from "contexts/NavigationContext";
import { SessionContext } from "contexts/SessionContext";

import { Grid, Button } from "@mui/material";
import { AddBox } from "@mui/icons-material";

const MySubGreddiits = () => {
  const addressFromik = useFormik({
    initialValues: {
      country: "India",
      state: null,
      city: null,
    },
    onSubmit: (values) => console.log(JSON.stringify(values)),
  });

  const countries = csc.getAllCountries();

  const updatedCountries = countries.map((country) => ({
    label: country.name,
    value: country.id,
    ...country,
  }));
  
  const updatedStates = (countryId) =>
    csc
      .getStatesOfCountry(countryId)
      .map((state) => ({ label: state.name, value: state.id, ...state }));
  const updatedCities = (stateId) =>
    csc
      .getCitiesOfState(stateId)
      .map((city) => ({ label: city.name, value: city.id, ...city }));

  const { values, handleSubmit, setFieldValue, setValues } = addressFromik;

  useEffect(() => {}, [values]);

  return (
    <>
      <Page full header={"Slot Booking Portal"} loading={false} empty={false}>
        <hr/>
        <div className="App container my-3 py-3">
          <form onSubmit={handleSubmit}>
            <div className="container py-2"><center><bold>Select Country</bold></center></div>
            <Select
              id="country"
              name="country"
              label="country"
              options={updatedCountries}
              value={values.country}
              // onChange={value => {
              //   setFieldValue("country", value);
              //   setFieldValue("state", null);
              //   setFieldValue("city", null);
              // }}
              onChange={(value) => {
                setValues({ country: value, state: null, city: null }, false);
              }}
            />
            <div className="container py-2"><center><bold>Select State</bold></center></div>
            <Select
              id="state"
              name="state"
              options={updatedStates(
                values.country ? values.country.value : null
              )}
              value={values.state}
              onChange={(value) => {
                setValues({ state: value, city: null }, false);
              }}
            />
             <div className="container py-2"><center><bold>Select City</bold></center></div>
            <Select
              id="city"
              name="city"
              options={updatedCities(values.state ? values.state.value : null)}
              value={values.city}
              onChange={(value) => setFieldValue("city", value)}
            />
            <button type="submit" className="btn btn-success py-1 my-3">Next</button>
            <p>{JSON.stringify(csc.get)}</p>
          </form>
        </div>
      </Page>
    </>
  );
};

export default MySubGreddiits;
