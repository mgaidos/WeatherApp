export const getCurrentTime = (forecast) => {
    //Get formatted UTC time to compare with hourly from forecast
    const currentUtcTime = new Date();
    let formattedDateTime = currentUtcTime.toISOString().slice(0, -11)

    if (forecast) {
        const utcOffset = forecast.data.utc_offset_seconds
        //console.log(utcOffset / 60 /60)

        const timeIndex = forecast.data.hourly.time.map((oneTime, index) => {
            return oneTime.slice(0, -3) === formattedDateTime ? index : ''
        }).filter(item => typeof item === 'number')
        //console.log("time index: " + timeIndex)


        const currentDate = forecast.data.hourly.time[+timeIndex + Math.floor(utcOffset / 60 / 60)]

        const day = currentDate.slice(8, 10)
        const month = currentDate.slice(5,7)
        const year = currentDate.slice(0,4)
        const hours = currentDate.slice(11,16)
       // console.log(hours)
        

        const formattedDate = `${day}.${month}.${year} ${hours}`
       //console.log(formattedDate)

        return formattedDate

    }

}