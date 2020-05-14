import React, { useEffect, useState } from "react";
import "./flights-schedule.scss";
import * as FlightsActions from "../flights.actions";
import { connect } from "react-redux";
import {
  departureFlightsListSelector,
  arrivalFlightsListSelector,
} from "../flights.selectors";
import Flight from "../flight/Flight";
import { Route, Link, useLocation, useHistory } from "react-router-dom";
import moment from "moment";
import qs from "qs";

const FlightsSchedule = ({ getFlightsData, arrival, departure }) => {
  const [status, setStatus] = useState("departures");
  const [queryParam, setQueryParam] = useState({});
  const [day, setDay] = useState(moment().format("DD-MM-YYYY"));
  let history = useHistory();
  let today = moment().format("DD-MM-YYYY");
  let location = useLocation();

  const filterList = (arr, params) => {
    let flightsList = arr.filter(
      (data) => day === moment(data.actual).format("DD-MM-YYYY")
    );
    if (params.search) {
      return flightsList.filter((data) => {
        let a = data["carrierID.IATA"] + data.fltNo;
        return a.toLowerCase().includes(params.search.toLowerCase());
      });
    }
    return flightsList;
  };

  useEffect(() => {
    getFlightsData(today);
    setQueryParam(qs.parse(location.search, { ignoreQueryPrefix: true }));
    if (location.pathname.includes("/arrivals")) {
      setStatus("arrivals");
    } else {
      setStatus("departures");
    }
  }, [location, day]);

  const changeDay = (dayParam) => {
    setDay(
      moment()
        .add(dayParam, "d")
        .format("DD-MM-YYYY")
    );
  };

  return (
    <div className="search-results">
      <ul className="nav">
        <li
          className={`nav__item  ${
            status === "departures" ? "nav-active" : ""
          }`}
        >
          <Link to={`/depatures${location.search}`}>
            <i className="fas fa-plane-departure"></i>Departures
          </Link>
        </li>
        <li
          className={`nav__item ${status === "arrivals" ? "nav-active" : ""}`}
        >
          <Link to={`/arrivals${location.search}`}>
            <i className="fas fa-plane-arrival"></i> Arrivals
          </Link>
        </li>
      </ul>
      <div className="nav-date">
        <div
          className={`date  ${
            day ===
            moment()
              .add(-1, "d")
              .format("DD-MM-YYYY")
              ? " date-active "
              : " "
          } `}
          onClick={() => changeDay(-1)}
        >
          <div className="date__num">
            {" "}
            {moment()
              .add(-1, "d")
              .format("DD/MM")}
          </div>
          <div className="date__title">Yesterday</div>
        </div>
        <div
          className={`date ${
            day === moment().format("DD-MM-YYYY") ? " date-active " : " "
          }`}
          onClick={() => changeDay(0)}
        >
          <div className="date__num"> {moment().format("DD/MM")}</div>
          <div className="date__title">today</div>
        </div>
        <div
          className={`date ${
            day ===
            moment()
              .add(1, "d")
              .format("DD-MM-YYYY")
              ? " date-active "
              : " "
          }  `}
          onClick={() => changeDay(1)}
        >
          <div className="date__num">
            {moment()
              .add(1, "d")
              .format("DD/MM")}
          </div>
          <div className="date__title">Tomorrow</div>
        </div>
      </div>
      <div className="flights-schedule">
        <table className="flights-schedule__header">
          <thead>
            <tr data-v-27fc5867="">
              <th>Terminal</th>
              <th>Local time</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Airline</th>
              <th>Flight</th>
            </tr>
          </thead>
          <tbody className="flights-schedule__body">
            <Route path={`/:direction?`}>
              {status === "arrivals"
                ? filterList(arrival, queryParam).map((data) => (
                    <Flight
                      key={data.ID}
                      {...data}
                      cityTo={data["airportToID.name_en"]}
                      cityFrom={data["airportFromID.name_en"]}
                    />
                  ))
                : filterList(departure, queryParam).map((data) => (
                    <Flight
                      key={data.ID}
                      {...data}
                      cityTo={data["airportToID.name_en"]}
                      cityFrom={data["airportFromID.name_en"]}
                    />
                  ))}
            </Route>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    arrival: arrivalFlightsListSelector(state),
    departure: departureFlightsListSelector(state),
  };
};

const mapDispatch = {
  getFlightsData: FlightsActions.getFlightsData,
};

export default connect(mapState, mapDispatch)(FlightsSchedule);
