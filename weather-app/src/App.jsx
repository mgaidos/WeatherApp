import { createContext, useState, useEffect } from 'react'


//Components
import SearchInput from './components/SearchInput'
import WeatherInfoCard from './components/WeatherInfoCard';
import ThreeHourWeatherForecast from './components/ThreeHourWeatherForecast';
import SevenDayWeatherForecast from './components/SevenDayWeatherForecast';
import Loading from './components/Loading';

//Utils
import { getWeatherForecastByCoordinates } from './utils/getWeatherForecastByCoordinates'
import { getCoordinatesByIPGeolocation } from './utils/getCoordinatesByIPGeolocation';


//MUI Components
import { StyledEngineProvider } from '@mui/material/styles';
import { Box } from '@mui/material'
import { styled } from '@mui/system';

const WeatherContext = createContext()

//Custom hooks
import useDebounce from './hooks/useDebounce'


const StyledBox = styled(Box)(({ theme }) => ({
  marginTop: "20px",
  padding: 2,
  width: "95vw",
  maxWidth: 1150,
  [theme.breakpoints.up('sm')]: {
    width: "90vw"
  },
  height: "min-content",
  minHeight: 'max-content',
  display: "flex",
  flexDirection: 'column',
  borderRadius: 5,
  backgroundColor: "inherit",
  boxShadow: "-12px 10px 17px 0px rgba(0,0,0,0.24)",
  overflow: 'auto',
}))



function App() {

  const [inputValue, setInputValue] = useState('') //1
  const [searchedLocation, setSearchedLocation] = useState(''); //3 debounced value is saved into searchedLocation
  const [locationOptions, setLocationOptions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('')
  const [currentLocationName, setCurrentLocationName] = useState('')
  const [currentLocationCountry, setCurrentLocationCountry] = useState('')
  const [forecast, setForecast] = useState('')
  const [selectedDay, setSelectedDay] = useState(0)


  const debouncedValue = useDebounce(inputValue, 1000) //2 -- return debounced value from input
  useEffect(() => {
    //console.log(debouncedValue)
  }, [debouncedValue])




  const state = {
    inputValue,
    setInputValue,
    locationOptions,
    setLocationOptions,
    searchedLocation,
    setSearchedLocation,
    selectedLocation,
    setSelectedLocation,
    forecast,
    selectedDay,
    setSelectedDay,
    currentLocationName,
    setCurrentLocationName,
    currentLocationCountry,
    setCurrentLocationCountry,
  }



  useEffect(() => {
    getCoordinatesByIPGeolocation()
      .then(data => {
       

        if (data) {

          const latitude = data.data.location.latitude
          const longitude = data.data.location.longitude
          //console.log(latitude)
          setSelectedLocation({ latitude, longitude })
          let locationName = data.data.city.name
          setCurrentLocationName(locationName)
          setCurrentLocationCountry(data.data.country.name_native)
        }
      })
      .catch(err => {
        console.log(err)
        const latitude = 50.08804
        const longitude = 14.42076
        console.log(latitude)
        setSelectedLocation({ latitude, longitude })
        let locationName = 'Praha'
        setCurrentLocationName(locationName)
        setCurrentLocationCountry('Česko')
      })
  }, [])

  useEffect(() => {

    //selectedLocation && console.log(selectedLocation.center)
    //console.log(selectedLocation)
    const latitude = selectedLocation && +selectedLocation.latitude
    const longitude = selectedLocation && +selectedLocation.longitude

    selectedLocation && getWeatherForecastByCoordinates(latitude, longitude)
      .then(data => {
        //console.log(data)
        setForecast(data)
      })
      .catch(err => {
        console.log(err)
      })

  }, [selectedLocation])

  useEffect(() => {
   // forecast && console.log(forecast)
  }, [forecast])


  useEffect(() => {
    //console.log(selectedLocation)
  }, [searchedLocation, selectedLocation])





  useEffect(() => {

    if (debouncedValue) {
      //console.log(debouncedValue.trim().length)
      debouncedValue.trim().length > 0
        ?
        setSearchedLocation(debouncedValue.trim())
        :
        null
    }

  }, [debouncedValue])


  return (
    <StyledEngineProvider>
      <WeatherContext.Provider value={state}>
        {

          forecast ?
            <StyledBox>
              <SearchInput />
              <WeatherInfoCard />
              <ThreeHourWeatherForecast />
              <SevenDayWeatherForecast />
            </StyledBox>
            :
            <Loading />
        }
      </WeatherContext.Provider>
    </StyledEngineProvider>
  )
}

export { App, WeatherContext }
