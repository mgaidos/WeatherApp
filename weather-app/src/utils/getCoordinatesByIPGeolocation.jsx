import axios from "axios"

export const getCoordinatesByIPGeolocation = () => {

    const url = `https://api.geoapify.com/v1/ipinfo?&apiKey=${import.meta.env.VITE_IPCOORDINATES_ACCESS_TOKEN}`

    return axios.get(url)


}