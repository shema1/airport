import { FLIGHT_DATA_RECIVED } from './flights.actions'

const initialData = {
	flightsList: [],
}

const flightReducer = (state = initialData, action) => {
	switch (action.type) {
		case FLIGHT_DATA_RECIVED: {
			return {
				...state,
				flightsList: action.payload.flightsData,
			}
		}
		default:
			return state
	}
}

export default flightReducer
