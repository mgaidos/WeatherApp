import { useEffect, useContext, useState } from 'react';

//Components
import ThreeHourCard from './ThreeHourCard'

//MUI Components
import { styled } from '@mui/system';
import { Box } from '@mui/material';

//Utils
import { getThreeHourData } from '../utils/getThreeHourData';

const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    //border: '1px solid black',
    height: 'auto',
    padding: theme.spacing(1, 1),
    maxWidth: '100%',
    overflow: 'auto',
    [theme.breakpoints.up('md')]: {

    },
    '&::-webkit-scrollbar': {
        height: '1em'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.2)',
        borderRadius:' 5px',
      }
}))

//State
import { WeatherContext } from '../App';
import { ThreeMpRounded } from '@mui/icons-material';


const ThreeHourWeatherForecast = () => {

    const state = useContext(WeatherContext)
    const { forecast } = state

    const [threeHourData, setThreeHourData] = useState('')

    const [temperature_2m, setTemperature_2m] = useState([])
    const [time, setTime] = useState([])
    const [weatherImageAndStatus, setWeatherImageAndStatus] = useState([])
    const [precipitation, setPrecipitation] = useState([])


    useEffect(() => {
        const data = getThreeHourData(forecast)
        setThreeHourData(data && data)
    }, [forecast])

    useEffect(() => {
        if (threeHourData) {
            const { temperature_2m, time, weatherImageAndStatus, precipitation } = threeHourData[0]
            setTemperature_2m(temperature_2m)
            setTime(time)
            setWeatherImageAndStatus(weatherImageAndStatus)
            setPrecipitation(precipitation)
            //console.log(threeHourData)
        }

    }, [threeHourData])


    return (
        <section>
            <StyledBox>
                {
                    temperature_2m.map((item, index) => {
                        return <ThreeHourCard
                            key={index}
                            temperature_2m={item}
                            hour={time[index]}
                            weatherImage={weatherImageAndStatus[index][0]}
                            weatherStatus={weatherImageAndStatus[index][1]}
                            precipitation={precipitation[index]}
                            alt={weatherImageAndStatus[index][2]}
                        />
                    })
                }




            </StyledBox>
        </section>
    )
}

export default ThreeHourWeatherForecast