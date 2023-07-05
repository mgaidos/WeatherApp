import React from 'react'



//Components
import SearchInput from './components/SearchInput'

//MUI Components
import { Box } from '@mui/material'

function App() {


  return (
    <Box sx={{
      marginTop: "20px",
      padding: 2,
      width: "80vw",
      maxWidth: 1000,
      height: "90vh",
      display: "flex",
      borderRadius: 5,
      backgroundColor: "inherit",
      boxShadow: "-12px 10px 17px 0px rgba(0,0,0,0.24)",
    }}>

      <SearchInput/>

    </Box>
  )
}

export default App
