export const getSevenDaysData = (forecast) => {

    if (forecast) {
        const weathercode = forecast.data.daily.weathercode.slice(1)
        const precipitationSum =  forecast.data.daily.precipitation_sum.slice(1)
        const temperature2mMax = forecast.data.daily.temperature_2m_max.slice(1)
        const utcOffset = forecast.data.utc_offset_seconds
        //console.log(forecast)
        //console.log(utcOffset)
        //console.log(new Date('2023-08-01').getDay())
        let time = []

        
        let currentDateInSearchLocation = forecast.data.daily.time[1]
        let currentDay = new Date(currentDateInSearchLocation).getDay()
        
        const weekDays = ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota']

        for (let i = 0; i < 7; i++) {
            if (currentDay > 6) {
                currentDay = 0
                time.push(weekDays[currentDay])
            } else {
                time.push(weekDays[currentDay])
            }
            currentDay++
        }
        //console.log(time)

        const weatherImageAndStatus = weathercode.map((code, index) => {

           
            if (code === 0) {
                return ["src/assets/day_clear.svg", 'Jasno', 'Jasno', 'Jasno']
            }

            if (code === 1 || code === 2) {
                return ["src/assets/day_partial_cloud.svg", 'Polojasno', 'Polojasno']
            }

            if (code === 3) {
                return ["src/assets/overcast.svg", 'Zataženo', 'Zataženo']
            }

            if (code === 45 || code === 48) {
                return ["src/assets/fog.svg", 'Mlha', 'Mlha']
            }

            if (
                code === 51
                || code === 53
            ) {
                return ["src/assets/rain.svg", 'Lehké mrholení', 'Lehké mrholení']
            }

            if (
                code === 55
            ) {
                return ["src/assets/rain.svg", 'Mrholení', 'Mrholení']
            }

            if (
                code === 56
                || code === 57
            ) {
                return ["src/assets/rain.svg", 'Mrznoucí mrholení', 'Mrznoucí mrholení']
            }

            if (
                code === 61
            ) {
                return ["src/assets/rain.svg", 'Slabý déšť', 'Slabý déšť']
            }

            if (
                code === 63
            ) {
                return ["src/assets/rain.svg", 'Déšť', 'Déšť']
            }

            if (
                code === 65
            ) {
                return ["src/assets/rain.svg", 'Silný déšť', 'Silný déšť']
            }

            if (

                code === 66
                || code === 67

            ) {
                return ["src/assets/rain.svg", 'Mrznoucí déšť', 'Mrznoucí déšť']
            }

            if (
                code === 71

            ) {
                return ["src/assets/snow.svg", 'Slabé sněžení', 'Slabé sněžení']
            }

            if (
                code === 73 || code === 77

            ) {
                return ["src/assets/snow.svg", 'Sníh', 'Sníh' ]
            }

            if (
                code === 75
            ) {
                return ["src/assets/snow.svg", 'Silné sněžení', 'Silné sněžení']
            }

            if (
                code === 80
                || code === 81
                || code === 82
            ) {
                return ["src/assets/day_rain.svg", 'Dešťové přeháňky', 'Dešťové přeháňky']

            }

            if (
                code === 85
                || code === 86

            ) {
                return ["src/assets/day_snow.svg", 'Sněhové přeháňky', 'Sněhové přeháňky']
                 
            }

            if (
                code === 95
                || code === 96
                || code === 99
            ) {
                return ["src/assets/thunder.svg", 'Bouřky', 'Bouřky']
            }
        })


        return [{
            temperature_2m: temperature2mMax,
            weatherImageAndStatus: weatherImageAndStatus,
            time: time,
            precipitationSum: precipitationSum
        }]

    }

}