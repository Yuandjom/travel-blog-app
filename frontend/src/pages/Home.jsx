import React from 'react'
import Header from '../components/Header'
import { Box, Button, Typography } from '@mui/material' 
import { Link } from 'react-router-dom'

/**
 * Note that Box is the container of the homePage
 * 
 * Typography:
 * Variant can be used to increase the size of the text
 * 
 * Button: 
 * When the user click onto the button, the will be redirected to a different route
 * Linkcomponent need to have the link to the react-router-dom
 * Assign the props of the react-router-dom to this button which will redirect you to the diary page
 */
const Home = () => {
    return (
    <Box position={"relative"} width="100%" height="90vh">
      <img src="/road.jpg" alt="Road" width ={"100%"} height="70%" />
      <Typography 
        fontFamily={ 'Dancing Script, cursive'}
        variant="h3" 
        textAlign={'center'} 
        width={'100%'} 
        sx={{
          position: "absolute", 
          top: "0px", 
          color:"#111115de",
          background: "#B2C9DF"
        }}
      >
        Dare to live the life you've always wanted
      </Typography>
      <Box 
        width="100%" 
        height="30%" 
        display={'flex'} 
        flexDirection="column"
      >
        <Typography fontfamily={'Quicksand'} textAlign={'center'} variant="h4" padding={4}>
          SHARE YOUR TRAVEL DIARIES WITH US
        </Typography>
        <Box margin="auto">
          <Button variant='outlined' sx={{mr: 2}}>Share Your Story</Button>
          <Button LinkComponent={Link} to="/diaries" variant='contained' sx={{ml: 2}}>View Diaries</Button>
        </Box>
      </Box>
    </Box>

  )
}

export default Home