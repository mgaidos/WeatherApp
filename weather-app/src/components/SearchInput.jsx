import React, { useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete'
import { styled } from '@mui/system';

//Context
import { WeatherContext } from '../App';


//Custom hooks
import useDebounce from '../hooks/useDebounce';


const StyledTextField = styled(TextField)(({ theme }) => ({
    '.MuiInputBase-input': {
        color: "white"
    }
}))

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
    '.MuiAutocomplete-popper': {
        color: "red",
    }
}))


export default function CountrySelect() {

    const state = useContext(WeatherContext)


    const handleChange = (e) => {

        state.setInputValue(e.target.value)
    }

    useEffect(() => {
        //console.log(state.inputValue)
    }, [state.inputValue])

    return (
        <StyledAutocomplete
            onInputChange={(e) => handleChange(e)}
            id="country-select-demo"
            sx={{
                width: 300,
                '&.MuiAutocomplete-popper': {
                    backgroundColor: "inherit"
                }
            }}
            options={state.acOptions ? state.acOptions : countries}
            autoHighlight
            //getOptionLabel={(option) => option.label}


            renderOption={(props, option) => (

                <Box component="li" sx={
                    {
                        '& > img': {
                            mr: 2, flexShrink: 0
                        }
                    }
                } {...props}>
                    {option.label}
                </Box>
            )}

            renderInput={(params) => (


                <StyledTextField
                    {...params}
                    placeholder="Choose a place"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                    sx={{
                        '.MuiInputBase-Input': {
                            backgroundColor: "white"
                        }
                    }}
                />

            )}
        />
    );
}

const countries = [
    { code: 'AD', label: 'Andorra', phone: '376' },
    {
        code: 'AE',
        label: 'United Arab Emirates',
        phone: '971',
    },
]
