import { useState, useEffect, useContext } from 'react'

//MUI Components
import { styled } from '@mui/system';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';

//Utils
import { getDayOverviewData } from '../utils/getDayOverviewData';

//Context
import { WeatherContext } from '../App';

const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: 'inherit',

}))

const StyledCardContent = styled(CardContent)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

}))

const StyledImg = styled("img")(({ theme }) => ({
    width: '3rem',

}))

const StyledDiv = styled("div")(({ theme }) => ({
    width: '5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}))



const DayOverviewCard = () => {

    const state = useContext(WeatherContext)
    const { forecast } = state
    const [dayOverviewData, setDayOverviewData] = useState('')
    const [humidity, setHumidity] = useState('')
    const [apparentTemperature, setApparentTemperature] = useState('')
    const [rain, setRain] = useState('')
    const [windspeed, setWindspeed] = useState('')
    const [windgusts, setWindgusts] = useState('')
    const [surfacePressure, setSurfacePressure] = useState('')
    const [windDirection, setWindDirection] = useState('')
    const [windDirectionImg, setWindDirectionImg] = useState('')
    const [arrowAlt, setArrowAlt] = useState('')

    useEffect(() => {
        const data = getDayOverviewData(forecast)
        setDayOverviewData(data && data)
    }, [forecast])

    useEffect(() => {

        if (dayOverviewData) {
            const { humidity, apparentTemperature, rain, windspeed, windgusts, surfacePressure, windDirection, windDirectionImg, alt } = dayOverviewData


            setHumidity(humidity)
            setApparentTemperature(apparentTemperature)
            setRain(rain)
            setWindspeed(windspeed)
            setWindgusts(windgusts)
            setSurfacePressure(surfacePressure)
            setWindDirection(windDirection)
            setWindDirectionImg(windDirectionImg)
            setArrowAlt(alt)
        }

    }, [dayOverviewData])

    return (
        <StyledCard elevation={10}>
            <StyledCardContent>
                <StyledDiv>
                    <StyledImg src="src\assets\overview-icons\wi-thermometer.svg" alt="Pocitová teplota" />
                    <Typography>Pocitově</Typography>
                    <Typography>{apparentTemperature}&nbsp;°C</Typography>
                </StyledDiv>
                <StyledDiv>
                    <StyledImg src="src\assets\overview-icons\wi-barometer.svg" alt="Tlak vzduchu" />
                    <Typography>Tlak</Typography>
                    <Typography>{surfacePressure}&nbsp;hPa</Typography>
                </StyledDiv>
                <StyledDiv>
                    <StyledImg src="src\assets\overview-icons\wi-raindrops.svg" alt="Srážky" />
                    <Typography>Srážky</Typography>
                    <Typography>{rain}&nbsp;mm</Typography>
                </StyledDiv>
            </StyledCardContent>
            <StyledCardContent>
                <StyledDiv>
                    <StyledImg src="src\assets\overview-icons\wi-strong-wind.svg" alt="Rychlost větru" />
                    <Typography>Vítr</Typography>
                    <Typography>{windspeed}&nbsp;km/h</Typography>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <img src={windDirectionImg} alt={arrowAlt} style={{
                            width: '2.5rem',
                        }} />
                        <Typography sx={{
                            width: '2rem',
                        }}>{windDirection}</Typography>
                    </div>
                </StyledDiv>
                <StyledDiv>
                    <StyledImg src="src\assets\overview-icons\wi-cloudy-gusts.svg" alt="Rychlost větru v nárazech" />
                    <Typography>Nárazy</Typography>
                    <Typography>{windgusts}&nbsp;km/h</Typography>
                </StyledDiv>
                <StyledDiv>
                    <StyledImg src="src\assets\overview-icons\wi-humidity.svg" alt="Vlhkost vzduchu" />
                    <Typography>Vlhkost</Typography>
                    <Typography>{humidity}&nbsp;%</Typography>
                </StyledDiv>
            </StyledCardContent>
        </StyledCard>
    )
}

export default DayOverviewCard