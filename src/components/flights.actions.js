
export const FLIGHT_DATA_RECIVED = "FLIGHT_DATA_RECIVED"
import {  fetchFlights } from "./flight-gateway"


export const flightsDataRecived = (flightsData) => {
    return {
        type: FLIGHT_DATA_RECIVED,
        payload: {
            flightsData
        }
    }
}


export const getFlightsData = (data) => {
    return function (dispatch) {
        fetchFlights(data).then(flights => dispatch(flightsDataRecived(flights)))
    }
}

