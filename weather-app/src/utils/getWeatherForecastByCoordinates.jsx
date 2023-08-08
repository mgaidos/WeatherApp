import axios from "axios";

export const getWeatherForecastByCoordinates = (latitude, longitude) => {
    const baseUrl = 'https://api.open-meteo.com/v1/forecast?'

    const oldUrl = `${baseUrl}latitude=${latitude}&longitude=${longitude}&hourly=weathercode,temperature_2m,rain,cloudcover,windspeed_10m,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&past_days=1`

    const newUrl = `${baseUrl}latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,rain,weathercode,surface_pressure,cloudcover,windspeed_10m,winddirection_10m,windgusts_10m,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum&timezone=auto&past_days=1`

    

    return axios.get(newUrl)
    

}