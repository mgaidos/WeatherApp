export const getDayOverviewData = (forecast) => {
    const currentUtcTime = new Date();
    let formattedDateTime = currentUtcTime.toISOString().slice(0, -11)

    if (forecast) {
        const utcOffset = +forecast.data.utc_offset_seconds / 60 / 60
        const timeIndex = +forecast.data.hourly.time.map((oneTime, index) => {
            return oneTime.slice(0, -3) === formattedDateTime ? index : ''
        }).filter(item => typeof item === 'number')

        const currentTimeIndex = Math.floor(utcOffset) + timeIndex



        const humidity = forecast.data.hourly.relativehumidity_2m[currentTimeIndex]
        const apparentTemperature = forecast.data.hourly.apparent_temperature[currentTimeIndex]
        const rain = forecast.data.hourly.rain[currentTimeIndex]
        const windspeed = forecast.data.hourly.windspeed_10m[currentTimeIndex]
        const windgusts = forecast.data.hourly.windgusts_10m[currentTimeIndex]
        const surfacePressure
            = forecast.data.hourly.surface_pressure
            [currentTimeIndex]
        const windDirectionInDegrees = forecast.data.hourly.winddirection_10m
        [currentTimeIndex]
        
        
        

        let windDirection
        let windDirectionImg
        let alt

        if (
            windDirectionInDegrees >= 0
            &&
            windDirectionInDegrees <= 11.25
        ) {
            windDirection = 'S'
            windDirectionImg = "src/assets/overview-icons/wi-direction-down.svg"
            alt = 'arrow down'
        }

        if (
            windDirectionInDegrees > 11.25
            &&
            windDirectionInDegrees <= 33.75
        ) {
            windDirection = 'SSV'
            windDirectionImg = "src/assets/overview-icons/wi-direction-down-left.svg"
            alt = 'arrow down left'
        }

        if (
            windDirectionInDegrees > 33.75
            &&
            windDirectionInDegrees <= 56.25
        ) {
            windDirection = 'SV'
            windDirectionImg = "src/assets/overview-icons/wi-direction-down-left.svg"
            alt = 'arrow down left'
        }

        if (
            windDirectionInDegrees > 56.25
            &&
            windDirectionInDegrees <= 78.75
        ) {
            windDirection = 'VSV'
            windDirectionImg = "src/assets/overview-icons/wi-direction-down-left.svg"
            alt = 'arrow down left'
        }

        if (
            windDirectionInDegrees > 78.75
            &&
            windDirectionInDegrees <= 101.25
        ) {
            windDirection = 'V'
            windDirectionImg = "src/assets/overview-icons/wi-direction-left.svg"
            alt = 'arrow left'
        }

        if (
            windDirectionInDegrees > 101.25
            &&
            windDirectionInDegrees <= 123.75
        ) {
            windDirection = 'VJV'
            windDirectionImg = "src/assets/overview-icons/wi-direction-up-left.svg"
            alt = 'arrow up left'
        }

        if (
            windDirectionInDegrees > 123.75
            &&
            windDirectionInDegrees <= 146.25
        ) {
            windDirection = 'JV'
            windDirectionImg = "src/assets/overview-icons/wi-direction-up-left.svg"
            alt = 'arrow up left'
        }

        if (
            windDirectionInDegrees > 146.25
            &&
            windDirectionInDegrees <= 168.75
        ) {
            windDirection = 'JJV'
            windDirectionImg = "src/assets/overview-icons/wi-direction-up-left.svg"
            alt = 'arrow up left'
        }

        if (
            windDirectionInDegrees > 168.75
            &&
            windDirectionInDegrees <= 191.25
        ) {
            windDirection = 'J'
            windDirectionImg = "src/assets/overview-icons/wi-direction-up.svg"
            alt = 'arrow up'
        }

        if (
            windDirectionInDegrees > 191.25
            &&
            windDirectionInDegrees <= 213.75
        ) {
            windDirection = 'JJZ'
            windDirectionImg = "src/assets/overview-icons/wi-direction-up-right.svg"
            alt = 'arrow up right'
        }

        if (
            windDirectionInDegrees > 213.75
            &&
            windDirectionInDegrees <= 236.25
        ) {
            windDirection = 'JZ'
            windDirectionImg = "src/assets/overview-icons/wi-direction-up-right.svg"
            alt = 'arrow up right'
        }

        if (
            windDirectionInDegrees > 236.25
            &&
            windDirectionInDegrees <= 258.75
        ) {
            windDirection = 'ZJZ'
            windDirectionImg = "src/assets/overview-icons/wi-direction-up-right.svg"
            alt = 'arrow up right'
        }

        if (
            windDirectionInDegrees > 258.75
            &&
            windDirectionInDegrees <= 281.25
        ) {
            windDirection = 'Z'
            windDirectionImg = "src/assets/overview-icons/wi-direction-right.svg"
            alt = 'arrow up right'
        }

        if (
            windDirectionInDegrees > 281.25
            &&
            windDirectionInDegrees <= 303.75
        ) {
            windDirection = 'ZSZ'
            windDirectionImg = "src/assets/overview-icons/wi-direction-down-right.svg"
            alt = 'arrow down right'
        }

        if (
            windDirectionInDegrees > 303.75
            &&
            windDirectionInDegrees <= 326.25
        ) {
            windDirection = 'SZ'
            windDirectionImg = "src/assets/overview-icons/wi-direction-down-right.svg"
            alt = 'arrow down right'
        }

        if (
            windDirectionInDegrees > 326.5
            &&
            windDirectionInDegrees <= 348.75
        ) {
            windDirection = 'SSZ'
            windDirectionImg = "src/assets/overview-icons/wi-direction-down-right.svg"
            alt = 'arrow down right'
        }

        if (
            windDirectionInDegrees > 348.75
            
        ) {
            windDirection = 'S'
            windDirectionImg = "src/assets/overview-icons/wi-direction-down.svg"
            alt = 'arrow down'
        }






        return {
            humidity: humidity,
            apparentTemperature: apparentTemperature,
            rain: rain,
            windspeed: windspeed,
            windgusts: windgusts,
            surfacePressure: surfacePressure,
            windDirection: windDirection,
            windDirectionImg: windDirectionImg,
            alt: alt
        }
    }

}