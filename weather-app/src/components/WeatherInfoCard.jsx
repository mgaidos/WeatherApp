
import { useEffect, useContext, useState } from 'react';

//MUI Components
import { styled } from '@mui/system';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';

//Components
import DayOverviewCard from './DayOverviewCard';

//Context
import { WeatherContext } from '../App';

//Utils
import { getCurrentTemperature } from '../utils/getCurrentTemperature'
import { getWeatherInfoWithImage } from '../utils/getWeatherInfoWithImage'
import { getCurrentTime } from '../utils/getCurrentTime'




const StyledDiv = styled('section')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    zIndex: 0,
    //border: '1px solid black',
    width: '100%',
    minHeight: '25%',
    position: 'relative',
    top: 0,
    padding: theme.spacing(1, 1),
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
    }

}))

const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    //border: '1px solid black',
    width: '50%',
    height: 'inherit',
}))

const ImgWrapper = styled('div')(({ theme }) => ({
    width: '8rem',
    height: '8rem',
    position: 'absolute',
    top: 0,
    right: 0,
    order: 2,
    [theme.breakpoints.up('sm')]: {
        width: '10rem',
        height: '10rem',
        order: 3,

    }
}))

const WeatherInfoCard = () => {

    const state = useContext(WeatherContext)

    const [currentTemperature, setCurrentTemperature] = useState('')
    const [weatherImg, setWeatherImg] = useState('')
    const [weatherStatus, setWeatherStatus] = useState('')
    const [currentTime, setCurrentTime] = useState('')
    const [altImg, setAltImg] = useState('')

    const {
        selectedLocation,
        forecast,
        currentLocationName,
        currentLocationCountry
    } = state

    useEffect(() => {
        const currentTemperature = getCurrentTemperature(forecast)
        const currentWeatherInfoWithImg = getWeatherInfoWithImage(forecast)
        const currentDate = getCurrentTime(forecast)
        setCurrentTemperature(currentTemperature)
        setWeatherImg(currentWeatherInfoWithImg && currentWeatherInfoWithImg[0])
        setWeatherStatus(currentWeatherInfoWithImg && currentWeatherInfoWithImg[1])
        setAltImg(currentWeatherInfoWithImg && currentWeatherInfoWithImg[2])
        setCurrentTime(currentDate)


    }, [forecast])

    useEffect(() => {
        //console.log(selectedLocation)
    }, [selectedLocation])


    return (
        <StyledDiv>
            <div style={{
                display: 'flex',
                width: '100%',
                marginRight: '10px',
            }}>
                <StyledBox>
                    <div>
                        <Typography component='h1' variant='h4'>
                            {
                                currentLocationName && currentLocationName
                            }
                        </Typography>

                        <Typography component='h4' variant='subtitle1'>
                            {
                                currentLocationCountry && currentLocationCountry
                            }
                        </Typography>
                    </div>
                    <Typography component='h2' variant='h5' >{currentTime}</Typography>
                    <Typography component='h2' variant='h3' >{currentTemperature}&nbsp;°C</Typography>
                    <Typography component='h6' variant='h6'>{weatherStatus}</Typography>
                </StyledBox>

                <Box
                    sx={{
                        display: 'flex',
                        width: '50%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        flexDirection: 'column',
                    }}
                >



                    <ImgWrapper>
                        <img src={weatherImg} alt={altImg} style={{
                            width: 'inherit',
                            height: 'inherit',
                        }} />
                    </ImgWrapper>
                </Box>
            </div>

            <DayOverviewCard />
        </StyledDiv>
    )
}

export default WeatherInfoCard