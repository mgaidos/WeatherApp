import React, { useState, useEffect } from 'react'

//custom hooks
import useDebounce from '../hooks/useDebounce';
import useCoordinates from '../hooks/useCoordinates';

//MUI Components
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';


const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    paddingLeft: '40px',
    width: "100%",
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 1),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            '&:focus': {
                width: '70rem',

            }
        },
    },

}));

const Search = styled('div')(({ theme }) => ({

    position: 'relative',
    padding: theme.spacing(1, 1, 1, 0),
    backgroundColor: "rgba(0, 0, 0, 0.17)",
    marginLeft: 0,
    '&:hover': {
        backgroundColor: "rgba(0, 0, 0, 0.27)",
    },
    height: '39px',
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up('sm')]: {
        width: '40%',
    }
}))

const IconWrapper = styled('div')(({ theme }) => ({
    position: 'absolute',
    width: "max-content",
    padding: theme.spacing(0, 2),
    display: 'flex',


}))
const SearchInput = () => {

    const [inputValue, setInputValue] = useState(null)
    const debouncedValue = useDebounce(inputValue, 1000)

    const [coordinates, setCoordinates] = useState({ long: null, lat: null })
    const { long, lat } = useCoordinates(debouncedValue)



    useEffect(() => {
        setCoordinates({ long: long, lat: lat })
    }, [long, lat])


    const handleChange = (e) => {
        setInputValue(e.target.value)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Search>
                <IconWrapper>
                    <SearchIcon />
                </IconWrapper>
                <StyledInputBase onChange={handleChange} placeholder='Select city...' />
            </Search>
            <p>{inputValue && coordinates.long}</p>
            <p>{inputValue && coordinates.lat}</p>


            {debouncedValue && <Typography>Počasí v {debouncedValue} je</Typography>}

        </Box>
    )
}

export default SearchInput