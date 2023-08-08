
import React, { useEffect, useState } from 'react';
import useAutocomplete from '@mui/base/useAutocomplete';
import { styled } from '@mui/system';
import { Box } from '@mui/material';

const LoadingBox = styled(Box)(({ theme }) => ({
  width: '120px',
  height: '100vh',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}))

const IconWrapper = styled(Box)(({ theme }) => ({
  width: '2rem',
}))





const Loading = () => {

  const [isMoving, setIsMoving] = useState(true)


  useEffect(() => {
    const interval = setInterval(() => {
      setIsMoving((prevIsMoving) => !prevIsMoving)
    }, 500)

    return () => {
      clearInterval(interval)
    };
  }, []);

  

  return (

  
    <LoadingBox>
      <IconWrapper sx={{
        transform: isMoving ? 'translateY(10px)' : 'translateY(0)',
        transition: 'transform 0.3s linear',
        transitionDelay: '0.3s'
      }}>
        <img src="src\assets\day_clear.svg" alt="Slunce" />
      </IconWrapper>
      <IconWrapper sx={{
        transform: isMoving ? 'translateY(10px)' : 'translateY(0)',
        transition: 'transform 0.3s linear',
        transitionDelay: '0.2s'
      }}>
        <img src="src\assets\day_snow.svg" alt="Sněží" />
      </IconWrapper>
      <IconWrapper sx={{
        transform: isMoving ? 'translateY(10px)' : 'translateY(0)',
        transition: 'transform 0.3s linear',
        transitionDelay: '0.1s'
      }}>
        <img src="src\assets\thunder.svg" alt="Blesky" />
      </IconWrapper>
    </LoadingBox >)
  
}

export default Loading