import React from 'react'

//MUI Components
import { styled } from '@mui/material/styles';

//Components
import OneAcItem from './OneAcItem';

import { Box } from '@mui/material'

const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    //paddingLeft: '40px',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 'inherit',
    height: 'auto',
    //border: '1px solid black',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "rgba(0, 0, 0, 0.07)",
    [theme.breakpoints.up('sm')]: {
         width: '40%',
    },
}))

const Autocomplete = () => {
    return (
        <StyledBox>
            <OneAcItem></OneAcItem>
            <OneAcItem></OneAcItem>
            <OneAcItem></OneAcItem>
            <OneAcItem></OneAcItem>
            <OneAcItem></OneAcItem>
        </StyledBox>
    )
}

export default Autocomplete