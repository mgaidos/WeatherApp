import { useState, useEffect } from 'react'

import axios from 'axios';


const useCoordinates = (debouncedValue) => {

    const [coordinates, setCoordinates] = useState({ long: null, lat: null })

    axios.defaults.baseURL = import.meta.env.VITE_COORDINATES_URL

    useEffect(() => {
        if (debouncedValue) {
            axios.get(`/${encodeURIComponent(debouncedValue)}.json?access_token=${import.meta.env.VITE_MY_ACCESS_TOKEN}`)
                .then(data => {
                    console.log(data)
                    const longitude = data.data.features[0].geometry.coordinates[0]
                    const latitude = data.data.features[0].geometry.coordinates[1]

                    setCoordinates({ long: longitude, lat: latitude })
                })
                .catch(err => {
                    console.log(err)
                })
        }

    }, [debouncedValue])

    return { ...coordinates }
}
export default useCoordinates