export const getCurrentTemperature = (forecast) => {
    //Get formatted UTC time to compare with hourly from forecast
    const currentUtcTime = new Date();
    let formattedDateTime = currentUtcTime.toISOString().slice(0, -11)



    // console.log(formattedDateTime)

    if (forecast) {
        const utcOffset = forecast.data.utc_offset_seconds

        const timeIndex = forecast.data.hourly.time.map((oneTime, index) => {
            return oneTime.slice(0, -3) === formattedDateTime ? index : ''
        }).filter(item => typeof item === 'number')
        //console.log("time index: " + timeIndex)

      
             const currentTemperature = forecast.data.hourly.temperature_2m[+timeIndex + Math.floor(utcOffset / 60 / 60)]

        return currentTemperature
    }


}