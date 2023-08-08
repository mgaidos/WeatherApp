import React from 'react';

//MUI Components
import { styled, createTheme } from '@mui/system';
import { Typography } from '@mui/material';
import { Paper } from '@mui/material';

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

}))

const StyledDiv = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '4rem',
    marginBottom: '1rem',
}))




const ThreeHourCard = (props) => {
    const { hour, temperature_2m, weatherImage, weatherStatus, precipitation, alt } = props

    return (
        <StyledPaper elevation={3}>
            <Typography component='p'>{hour.slice(11)}</Typography>
            <StyledDiv style={{ width: '4rem', marginBottom: '1rem', }}>
                <img src={weatherImage} alt={alt} />
                <Typography sx={{textAlign: 'center'}}>{precipitation}&nbsp;mm</Typography>
            </StyledDiv>
            <Typography sx={{ fontSize: "0.8rem" }} component='p' >{weatherStatus}</Typography>
            <Typography component='h6' variant='h6'>{temperature_2m}&nbsp;°C</Typography>

        </StyledPaper>
    )
}

export default ThreeHourCard