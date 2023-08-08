import React from 'react'

import { useEffect, useContext, useState } from 'react';

//Utils
import { getSevenDaysData } from '../utils/getSevenDaysData';

//Components
import SevenDaysCard from './SevenDaysCard';
import ThreeHourCard from './ThreeHourCard';

//MUI Components
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';

const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    //border: '1px solid black',
    height: 'auto',
    padding: theme.spacing(1, 1),
    maxWidth: '100%',
    overflow: 'auto',
    [theme.breakpoints.up('lg')]: {
        //justifyContent: 'center',
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
import { getThreeHourData } from '../utils/getThreeHourData';


const SevenDayWeatherForecast = () => {


    const state = useContext(WeatherContext)
    const { forecast, selectedDay } = state

    //seven days data
    const [sevenDaysData, setSevenDaysData] = useState('')
    const [temperature_2m, setTemperature_2m] = useState([])
    const [time, setTime] = useState([])
    const [weatherImageAndStatus, setWeatherImageAndStatus] = useState([])
    const [precipitationSum, setPrecipitationSum] = useState([])

    //three hours data
    const [threeHoursData, setThreeHoursDara] = useState('')
    const [threeHoursTemperature_2m, setThreeHoursTemperature_2m] = useState([])
    const [threeHoursTime, setThreeHoursTime] = useState([])
    const [threeHoursWeatherImageAndStatus, setThreeHoursWeatherImageAndStatus] = useState([])
    const [threeHoursIsDay, setThreeHoursIsDay] = useState([])
    const [threeHoursPrecipitation, setThreeHoursPrecipitation] = useState([])

    useEffect(() => {
        const data = getSevenDaysData(forecast)
        setSevenDaysData(data && data)
    }, [forecast])

    useEffect(() => {
        const data = getThreeHourData(forecast, true)
        //console.log(data)
        setThreeHoursDara(data && data)
    }, [forecast])

    useEffect(() => {
        if (threeHoursData) {
            const {is_day, temperature_2m, time, weatherImageAndStatus,precipitation  } = threeHoursData[0]
 
            setThreeHoursIsDay(is_day[selectedDay])
            setThreeHoursTemperature_2m(temperature_2m[selectedDay])
            setThreeHoursTime(time[selectedDay])
            setThreeHoursWeatherImageAndStatus(weatherImageAndStatus[selectedDay])
            setThreeHoursPrecipitation(precipitation[selectedDay])
            
        }

    }, [threeHoursData, selectedDay])


    useEffect(() => {
        if (sevenDaysData) {
            const { temperature_2m, time, weatherImageAndStatus, precipitationSum } = sevenDaysData[0]
            setTemperature_2m(temperature_2m)
            setTime(time)
            setWeatherImageAndStatus(weatherImageAndStatus)
            setPrecipitationSum(precipitationSum)
        }

    }, [sevenDaysData])

    
    return (
        <section>
            <Typography variant="h5" component="h3">Týdenní předpověď</Typography>
            <StyledBox>
                {
                    temperature_2m.map((item, index) => {
                        return <SevenDaysCard
                            id={index}
                            key={index}
                            temperature_2m={item}
                            time={time[index]}
                            weatherImage={weatherImageAndStatus[index][0]}
                            weatherStatus={weatherImageAndStatus[index][1]}
                            precipitationSum={precipitationSum[index]}
                            alt={weatherImageAndStatus[index][2]}
                        />
                    })
                }
            </StyledBox>
            <StyledBox>
                { threeHoursTemperature_2m &&
                    threeHoursTemperature_2m.map((item, index) => {
                        return <ThreeHourCard
                            key={index}
                            temperature_2m={item}
                            hour={threeHoursTime[index]}
                            weatherImage={threeHoursWeatherImageAndStatus[index][0]}
                            weatherStatus={threeHoursWeatherImageAndStatus[index][1]}
                            precipitation={threeHoursPrecipitation[index]}
                            alt={threeHoursWeatherImageAndStatus[index][2]}
                        />
                    })
                }
            </StyledBox>
        </section>

    )
}

export default SevenDayWeatherForecast