export const getThreeHourData = (forecast, isSevenDaysForecast = false) => {

    const currentUtcTime = new Date();
    let formattedDateTime = currentUtcTime.toISOString().slice(0, -11)


    if (forecast) {

        const utcOffset = forecast.data.utc_offset_seconds

        const timeIndex = forecast.data.hourly.time.map((oneTime, index) => {
            return oneTime.slice(0, -3) === formattedDateTime ? index : ''
        }).filter(item => typeof item === 'number')
        //console.log("timeIndex: " + timeIndex)

        const endIndex = isSevenDaysForecast ? 191 : 49
        
        const timeOffset = isSevenDaysForecast ? 0 : (timeIndex - 24 + utcOffset / 60 / 60)
        //console.log(timeOffset)

        const threeHourData = [forecast.data.hourly].map((item) => {
            return {
                is_day: item.is_day.slice(24 + timeOffset, endIndex + timeOffset),
                temperature_2m: item.temperature_2m.slice(24 + timeOffset, endIndex + timeOffset),
                weathercode: item.weathercode.slice(24 + timeOffset, endIndex + timeOffset),
                time: item.time.slice(24 + timeOffset, endIndex + timeOffset),
                precipitation: item.precipitation.slice(24 + timeOffset, endIndex + timeOffset)
            }
        })
        const filteredThreeHourData = threeHourData.map((item) => {
            const filteredIsDay = item.is_day.filter((item, index) => index % 1 === 0)
            const temperature2m = item.temperature_2m.filter((item, index) => index % 1 === 0)
            const weathercode = item.weathercode.filter((item, index) => index % 1 === 0)
            const time = item.time.filter((item, index) => index % 1 === 0)
            const precipitation = item.precipitation.filter((item, index) => index % 1 === 0)

            const weatherImageAndStatus = weathercode.map((code, index) => {

                if (code === 0) {
                    return filteredIsDay[index]
                        ?
                        ["src/assets/day_clear.svg", 'Jasno', 'Jasno', 'Jasno']
                        :
                        ["src/assets/night_full_moon_clear.svg", 'Jasno', 'Jasno']
                }

                if (code === 1 || code === 2) {
                    return filteredIsDay[index]
                        ?
                        ["src/assets/day_partial_cloud.svg", 'Polojasno', 'Polojasno']
                        :
                        ["src/assets/night_full_moon_partial_cloud.svg", 'Polojasno', 'Polojasno']
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
                    return filteredIsDay[index] ?
                        ["src/assets/day_rain.svg", 'Dešťové přeháňky', 'Dešťové přeháňky']
                        :
                        ["src/assets/night_full_moon_rain.svg", 'Dešťové přeháňky', 'Dešťové přeháňky']
                }

                if (
                    code === 85
                    || code === 86

                ) {
                    return filteredIsDay[index] ?
                        ["src/assets/day_snow.svg", 'Sněhové přeháňky', 'Sněhové přeháňky']
                        :
                        ["src/assets/night_full_moon_snow.svg", 'Sněhové přeháňky', 'Sněhové přeháňky']
                }

                if (
                    code === 95
                    || code === 96
                    || code === 99
                ) {
                    return ["src/assets/thunder.svg", 'Bouřky', 'Bouřky']
                }
            })

            if (!isSevenDaysForecast) {
                return {
                    is_day: filteredIsDay,
                    temperature_2m: temperature2m,
                    weathercode: weathercode,
                    time: time,
                    weatherImageAndStatus: weatherImageAndStatus,
                    precipitation: precipitation
                }
            } else {
                const chunkedArray = (arr, chunkSize) => {
                    const chunkedArray = [];
                    for (let i = 0; i < arr.length; i += chunkSize) {
                        const chunk = arr.slice(i, i + chunkSize);
                        chunkedArray.push(chunk);
                    }
                    return chunkedArray;
                }

                return {
                    is_day: chunkedArray(filteredIsDay, 24),
                    temperature_2m: chunkedArray(temperature2m, 24),
                    weathercode: chunkedArray(weathercode, 24),
                    time: chunkedArray(time, 24),
                    weatherImageAndStatus: chunkedArray(weatherImageAndStatus, 24),
                    precipitation: chunkedArray(precipitation, 24)
                }
            }


        })


        return filteredThreeHourData

    }
}