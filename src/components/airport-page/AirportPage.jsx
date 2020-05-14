import React from "react";
import SearchForm from "../search-form/SearchForm";
import FlightsSchedule from "../flights-schedule/flightsSchedule";

const AirportPage = () => {
  return (
    <>
      <SearchForm />
      <FlightsSchedule/>
    </>
  );
};

export default AirportPage;
