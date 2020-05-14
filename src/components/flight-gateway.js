const baseUrl = 'https://api.iev.aero/api/flights'

export const fetchFlights = data => {
	return fetch(`${baseUrl}/${data}`).then(response => response.json())
}
