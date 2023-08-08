import axios from 'axios';

export const getLocationDataOptions = (value) => {
    /*
    console.log(`${import.meta.env.VITE_COORDINATES_URL}key=${import.meta.env.VITE_MY_ACCESS_TOKEN}&q=${encodeURIComponent(value)}&format=json`)
    return axios.get(`${import.meta.env.VITE_COORDINATES_URL}key=${import.meta.env.VITE_MY_ACCESS_TOKEN}&q=${encodeURIComponent(value)}&limit=5&zoom=18&dedupe=1&normalizeaddress=1&accept-language=cs&format=json`)
*/
    const url = 'https://api.locationiq.com/v1/autocomplete?'
   // console.log(`${url}key=${import.meta.env.VITE_MY_ACCESS_TOKEN}&q=${encodeURIComponent(value)}&format=json`)
    return axios.get(`${url}key=${import.meta.env.VITE_MY_ACCESS_TOKEN}&q=${encodeURIComponent(value)}&limit=5&dedupe=1&format=json`)


}

