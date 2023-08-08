export const getWeatherInfoWithImage = (forecast) => {
    //Get formatted UTC time to compare with hourly from forecast
    const currentUtcTime = new Date();
    let formattedDateTime = currentUtcTime.toISOString().slice(0, -11)
    if (forecast) {
        const utcOffset = forecast.data.utc_offset_seconds
        const timeIndex = forecast.data.hourly.time.map((oneTime, index) => {
            return oneTime.slice(0, -3) === formattedDateTime ? index : ''
        }).filter(item => typeof item === 'number')

        const isDay = forecast.data.hourly.is_day[+timeIndex + utcOffset / 60 / 60] // 0-1
        const weathercode = forecast.data.hourly.weathercode[+timeIndex + Math.floor(utcOffset / 60 / 60)]

        if (weathercode === 0) {
            return isDay ?
                ["src/assets/day_clear.svg", 'Jasno', 'Den, jasno']
                :
                ["src/assets/night_full_moon_clear.svg", 'Jasno', 'Noc, clear']
        }

        if (weathercode === 1 || weathercode === 2) {
            return isDay
                ?
                ["src/assets/day_partial_cloud.svg", 'Polojasno', 'Den, polojasno']
                :
                ["src/assets/night_full_moon_partial_cloud.svg", 'Polojasno', 'Noc, polojasno']
        }

        if (weathercode === 3) {
            return ["src/assets/overcast.svg", 'Zataženo', 'Zataženo']
        }

        if (weathercode === 45 || weathercode === 48) {
            return ["src/assets/fog.svg", 'Mlha', 'Mlha']
        }

        if (
            weathercode === 51
            || weathercode === 53
        ) {
            return ["src/assets/rain.svg", 'Lehké mrholení', 'Lehké mrholení']
        }

        if (
            weathercode === 55
        ) {
            return ["src/assets/rain.svg", 'Mrholení', 'Mrholení']
        }

        if (
            weathercode === 56
            || weathercode === 57
        ) {
            return ["src/assets/rain.svg", 'Mrznoucí mrholení', 'Mrznoucí mrholení']
        }

        if (
            weathercode === 61
        ) {
            return ["src/assets/rain.svg", 'Slabý déšť', 'Slabý déšť']
        }

        if (
            weathercode === 63
        ) {
            return ["src/assets/rain.svg", 'Déšť', 'Déšť']
        }

        if (
            weathercode === 65
        ) {
            return ["src/assets/rain.svg", 'Silný déšť', 'Silný déšť']
        }

        if (

            weathercode === 66
            || weathercode === 67

        ) {
            return ["src/assets/rain.svg", 'Mrznoucí déšť', 'Mrznoucí Déšť']
        }

        if (
            weathercode === 71

        ) {
            return ["src/assets/snow.svg", 'Slabé sněžení', 'Lehké sněžení']
        }

        if (
            weathercode === 73 || weathercode === 77

        ) {
            return ["src/assets/snow.svg", 'Sníh', 'Sníh']
        }

        if (
            weathercode === 75
        ) {
            return ["src/assets/snow.svg", 'Silné sněžení', 'Silné sněžení']
        }

        if (
            weathercode === 80
            || weathercode === 81
            || weathercode === 82
        ) {
            return isDay ?
                ["src/assets/day_rain.svg", 'Dešťové přeháňky', 'Dešťové přeháňky']
                :
                ["src/assets/night_full_moon_rain.svg", 'Dešťové přeháňky', 'Noc, Dešťové přeháňky']
        }

        if (
            weathercode === 85
            || weathercode === 86

        ) {
            return isDay ?
                ["src/assets/day_snow.svg", 'Sněhové přeháňky', 'Sněhové přeháňky']
                :
                ["src/assets/night_full_moon_snow.svg", 'Sněhové přeháňky', 'Noc, sněhové přeháňky']
        }

        if (
            weathercode === 95
            || weathercode === 96
            || weathercode === 99
        ) {
            return ["src/assets/thunder.svg", 'Bouřky', 'Bouřky']
        }
    }


}