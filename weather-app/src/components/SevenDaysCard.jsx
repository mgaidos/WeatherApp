import React, { useContext } from 'react'


//MUI Components
import { styled, createTheme } from '@mui/system';
import { Typography } from '@mui/material';
import { Paper } from '@mui/material';

//State
import { WeatherContext } from '../App';



const StyledPaper = styled(Paper)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: '8rem',
    height: 'min-content',
    padding: theme.spacing(1, 1),
    margin: theme.spacing(1, 1),
    color: 'white',
    backgroundColor: 'rgba(45, 45, 200, 0.20)',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.40)'
    }
    ,
    cursor: 'pointer'

}))

const StyledDiv = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '4rem',
    marginBottom: '1rem',
}))

const SevenDaysCard = (props) => {
    const { time, temperature_2m, weatherImage, weatherStatus, id, precipitationSum, alt } = props
    const { selectedDay, setSelectedDay } = useContext(WeatherContext)

    const handleClick = (e) => {
        const clickedId = e.currentTarget.id
        setSelectedDay(clickedId)
    }


    return (
        <StyledPaper sx={{
            backgroundColor: selectedDay == id ? 'rgba(0, 0, 0, 0.40)' : ''
        }} id={id} elevation={3} onClick={handleClick}>
            <Typography component='p'>{time}</Typography>
            <StyledDiv style={{ width: '4rem' }}>
                <img src={weatherImage} alt={alt} />
                <Typography sx={{textAlign: 'center'}}>{precipitationSum}&nbsp;mm</Typography>
            </StyledDiv>
            <Typography sx={{ fontSize: "0.8rem" }} component='p' >{weatherStatus}</Typography>
            <Typography component='h6' variant='h6'>{temperature_2m}&nbsp;°C</Typography>
        </StyledPaper>
    )
}

export default SevenDaysCard