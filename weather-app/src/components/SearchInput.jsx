

import { useEffect, useContext, useRef } from 'react';


//MUI Components
import useAutocomplete from '@mui/base/useAutocomplete';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@mui/material';

import { WeatherContext } from '../App';


//Utils
import { getLocationDataOptions } from '../utils/getLocationDataOptions'





const Input = styled('input')(({ theme }) => ({

    width: '100%',
    //height: '2rem',
    color: 'white',
    backgroundColor: 'rgba(5, 5, 5, 0)',
    border: "none",
    padding: theme.spacing(1, 1, 1, 5),
    '&:focus': {
        outline: 'none',
    },

    [theme.breakpoints.up('sm')]: {
        width: '400px',
    },

}));

const ListItem = styled('li')(({ theme }) => ({
    //position: 'relative',
    width: '100%',
    maxHeight: 'min-content',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(5, 5, 5, 0.2)',
    margin: theme.spacing(0.5, 0, 0, 0),
    padding: theme.spacing(1, 1, 1, 5),
    marginTop: '5px',
    '&:hover': {
        backgroundColor: 'rgba(5, 5, 5, 0.4)',
    },

}))

const Listbox = styled('ul')(({ theme }) => ({
    //position: 'absolute',
    width: "auto",
    //margin: theme.spacing(0.5, 0, 0, 0),
    //padding: theme.spacing(1, 1, 1, 5),
    borderRadius: theme.shape.borderRadius,
    //backgroundColor: 'rgba(5, 5, 5, 0.2)',
    zIndex: 1,
    listStyle: 'none',
    overflow: 'auto',
    maxHeight: 500,
    //border: '1px solid rgba(0,0,0,.25)',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    '& li.Mui-focused': {
        backgroundColor: 'rgba(5, 5, 5, 0.4)',
        //color: 'red',
        cursor: 'pointer',
    },
    '& li:active': {
        backgroundColor: '#2977f5',
        color: 'white',
    },
    '&::-webkit-scrollbar': {
        height: '1em'
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.2)',
        borderRadius: ' 5px',
    }
}));

const SearchWrapper = styled('div')(({ theme }) => ({
    backgroundColor: 'rgba(5, 5, 5, 0.3)',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    borderRadius: theme.shape.borderRadius,

    '&:hover': {
        outline: 'none',
        backgroundColor: 'rgba(5, 5, 5, 0.4)',
    },
}))

const IconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    width: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

const StyledHeader = styled('header')(({ theme }) => ({
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: '300px',
    }

}))

const StyledTypography = styled(Typography)(({ theme }) => ({
    textAlign: 'left',
    width: '100%',
}))

const DeleteIcon = styled(AddIcon)(({ theme }) => ({
    transform: 'rotate(45deg)',
    zIndex: 5,

}))

export default function UseAutocomplete() {

    //CONTEXT
    const state = useContext(WeatherContext)
    const {
        inputValue,
        setInputValue,
        locationOptions,
        searchedLocation,
        setLocationOptions,
        setSearchedLocation,
        setSelectedLocation,
        setCurrentLocationName,
        setCurrentLocationCountry,

    } = state

    

    useEffect(() => {
        /*
        Returns max 5 location options based on user input (searchedLocation)
         */
        searchedLocation && getLocationDataOptions(searchedLocation)
            .then(data => {
                //console.log(data.data)
                setLocationOptions(data.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [searchedLocation, setLocationOptions])


    const handleChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleClick = (option) => {

        const latitude = option.lat
        const longitude = option.lon

        //console.log(option)
        setSearchedLocation(option.address.name)
        setCurrentLocationName(option.address.name)
        setCurrentLocationCountry(option.address.country)
        setSelectedLocation({ latitude, longitude })
        setLocationOptions([])

    }


    //vymazat
    const {
        getRootProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
    } = useAutocomplete({
        id: 'use-autocomplete-demo',
        options: locationOptions,
        getOptionLabel: (option) => option.address.name,
        filterOptions: (option) => option,
        isOptionEqualToValue: (option, value) => option.id === value.id,
        
    });

    const deleteButton = () => {
        setInputValue('')
        setLocationOptions([])
    }



    return (
        <StyledHeader {...getRootProps()}>




            <SearchWrapper >

                <IconWrapper>
                    <SearchIcon />
                </IconWrapper>

                <Input autoFocus placeholder='Vyberte místo' onInput={handleChange} {...getInputProps()} />

                <IconButton onClick={deleteButton} sx={{ padding: 0, marginLeft: '1.5rem', }} >
                    <DeleteIcon />
                </IconButton>

            </SearchWrapper>



            {

                groupedOptions.length > 0 ? (
                    <Listbox {...getListboxProps()}>
                        {groupedOptions.map((option, index) => (
                            <div key={index} onClick={() => handleClick(option)}>
                                <SearchWrapper>
                                    <IconWrapper>
                                        <LocationOnIcon />
                                    </IconWrapper>

                                    <ListItem sx={{
                                        display: 'flex',
                                        flexDirection: 'column',


                                    }}
                                        key={index}
                                        {...getOptionProps({ option, index })}>
                                        <StyledTypography >
                                            {option.address.name}
                                        </StyledTypography>
                                        <StyledTypography variant='caption' component="h6">
                                            {option.display_name}
                                        </StyledTypography>
                                    </ListItem>

                                </SearchWrapper>

                            </div>
                        ))}
                    </Listbox>
                ) : null}



        </StyledHeader>
    );
}