import { createSelector } from 'reselect';
// import moment from moment


export const flightsListSelector = (state) => {
    return state.flights.flightsList
};


//   export const flterFlightsSelector = ()=>{}

export const departureFlightsListSelector = createSelector(
    [flightsListSelector],
    (flightsList) => {
          if (flightsList.length === 0) return flightsList;
        //   return filterFlightsList(flightsList.body.departure, 'timeDepShedule');
        return flightsList.body.departure;
    }
);

export const arrivalFlightsListSelector = createSelector(
    [flightsListSelector],
    (flightsList) => {
          if (flightsList.length === 0) return flightsList;
        //   return filterFlightsList(flightsList.body.arrival, 'timeArrShedule');
        return flightsList.body.arrival;
    }
);