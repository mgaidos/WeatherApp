import React, { createContext, useState, useEffect } from 'react'



//Components
import SearchInput from './components/SearchInput'


//MUI Components
import { StyledEngineProvider } from '@mui/material/styles';
import { Box } from '@mui/material'

const WeatherContext = createContext()

//Custom hooks
import useDebounce from './hooks/useDebounce'
import useCoordinates from './hooks/useCoordinates'


function App() {

  const [inputValue, setInputValue] = useState('')
  const [place, setPlace] = useState('')
  const [acOptions, setAcOptions] = useState([])

  const state = {
    inputValue,
    setInputValue,
    acOptions
  }

  const debouncedValue = useDebounce(inputValue, 1000)
  const coordinates = useCoordinates(place)

  useEffect(() => {
    setPlace(debouncedValue)
  }, [debouncedValue])

  useEffect(() => {
    console.log(place)
  }, [place])

  useEffect(() => {
    const optionsLabel = coordinates.map((option) => {
      return {
        label: option.place_name,
        latitude: option.geometry.coordinates[1],
        longitude: option.geometry.coordinates[0]
      }
    })
    setAcOptions(optionsLabel)

    console.log(coordinates)
  }, [coordinates])

  useEffect(() => {
    console.log(acOptions)
  }, [acOptions])



  return (
    <StyledEngineProvider injectFirst>
      <WeatherContext.Provider value={state}>
        <Box sx={{
          marginTop: "20px",
          padding: 2,
          width: "80vw",
          maxWidth: 1000,
          height: "90vh",
          display: "flex",
          flexDirection: 'column',
          borderRadius: 5,
          backgroundColor: "inherit",
          boxShadow: "-12px 10px 17px 0px rgba(0,0,0,0.24)",
        }}>

          <SearchInput />




        </Box>
      </WeatherContext.Provider>
    </StyledEngineProvider>
  )
}

export { App, WeatherContext }
