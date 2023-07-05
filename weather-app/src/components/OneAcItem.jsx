import React from 'react'

//MUI Components
import { Paper, Typography, styled } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn';

const StyledPaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    backgroundColor: 'inherit',
    //padding: theme.spacing(1, 1, 1, 0),
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'space-between',
    margin: theme.spacing(0.5, 0.5, 0.5, 0),
    '&:hover': {
        backgroundColor: "rgba(0, 0, 0, 0.27)",
        cursor: 'pointer',
    },
}))

const StyledTypography = styled(Typography)(({ theme }) => ({
    padding: theme.spacing(1, 1, 1, 6)
}))

const IconWrapper = styled('div')(({ theme }) => ({
    position: 'absolute',
    width: "max-content",
    padding: theme.spacing(0, 2),
    display: 'flex',


}))

const OneAcItem = () => {
    return (
        <StyledPaper
        onClick={()=> {
            console.log('clicked')
        }}
            elevation={3}
        >
            <IconWrapper>
                <LocationOnIcon />
            </IconWrapper>

            <StyledTypography>Strážnice</StyledTypography>
        </StyledPaper>

    )
}

export default OneAcItem