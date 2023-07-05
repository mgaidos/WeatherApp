import { useState, useEffect } from 'react'
import axios from 'axios'

const useForecast = (coordinates) => {

    const { long, lat } = coordinates
    const [forecast, setForecast] = useState('')

    const meteoUrl = 'https://api.open-meteo.com/v1/forecast?'

    useEffect(() => {

        if (long !== null && lat !== null) {
            axios.get(`${meteoUrl}latitude=${lat}&longitude=${long}&hourly=temperature_2m,rain,cloudcover,windspeed_10m,uv_index,is_day&daily=sunrise,sunset,uv_index_max,precipitation_sum,rain_sum&timezone=Europe%2FBerlin`)
                .then(data => {
                    //console.log(data)
                    setForecast(data)
                })
                .catch(err => {
                    console.log(err)
                })

        }


    }, [coordinates, lat, long])
    return forecast
}

export default useForecast