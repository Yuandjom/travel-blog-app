import { Box, FormLabel, TextField, Typography, Button } from '@mui/material'
import React from 'react'
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { margin } from '@mui/system';
import { useState } from 'react';

function Add() {
  const [inputs, setInputs] = useState({
    title: "", 
    description: "", 
    imageURL : "", 
    location: "", 
    date: "",
  })
  /**
   * Note that onChange will have an event 
   * then the event will have all the name, value (which are properties)
   * 
   */
  const handleChange = (e) => {
    e.prevent.Default()

  }

  /**
   * Note that value is the inputs.title
   * name is the identifier 
   */
  return (

    //Width 100% here is the parent
    //thie width below 80% onwards are in relative to the parent
    <Box 
        display = "flex" 
        flexDirection={"column"} 
        width= "100%"
        height="100%"
    >
        <Box display="flex" margin= "auto" padding={2}>
            <Typography fontWeight={'bold'} variant='h4' fontFamily={"dancing script"}>
                Add Your Travel Diary
            </Typography>
            <TravelExploreIcon sx={{fontSize: "40px", color: "lightcoral"}}/>
        </Box>
        <form>
          <Box 
            padding={3} 
            display="flex" 
            margin = "auto"
            width="80%" 
            flexDirection={"column"}>
              
            <FormLabel sx={{fontFamily: "quicksand"}}>Title</FormLabel>
            <TextField 
             onChange={handleChange}
             name="title"
             value={inputs.title} 
             variant='standard' 
             margin='normal' />
            <FormLabel sx={{fontFamily: "quicksand"}}>Description</FormLabel>
            <TextField variant='standard' margin='normal'/>
            <FormLabel sx={{fontFamily: "quicksand"}} >Image URL</FormLabel>
            <TextField variant='standard' margin='normal'/>

            <FormLabel sx={{fontFamily: "quicksand"}} >Location</FormLabel>
            <TextField variant='standard' margin='normal'/>
            <FormLabel sx={{fontFamily: "quicksand"}}>Date</FormLabel>
            <TextField variant='standard' margin='normal'/>
            <Button color="warning" sx={{width:"50%" ,margin:"auto",mt: 2, borderRadius:7}} variant="contained">Post</Button>
          </Box>
        </form>
    </Box>
  )
}

export default Add