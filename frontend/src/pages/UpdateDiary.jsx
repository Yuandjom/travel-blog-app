import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getPostDetails, postUpdate } from '../features/posts/postService'
import { Box, FormLabel, TextField, Typography, Button } from '@mui/material'
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { useState } from 'react';
import { addPost } from '../features/posts/postService';
function UpdateDiary() {
    const [post, setPost] = useState()

    //getting the id from the url 
    const id = useParams().id

    console.log(id)
    useEffect(() => {
        getPostDetails(id)
            .then(data=>{
                setPost(data.post)
                
                setInputs({
                    title: data.post.title, 
                    description: data.post.description, 
                    imageURL: data.post.image, 
                    location: data.post.location, 
                })
            })
        
            .catch(err=>console.log(err))
    }, [id])

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
        /**
         * To make sure that you can enter something into the textfield, 
         * U have to use the prevstate and setInputs, 
         * 
         * prevState will be the parameter and the [] will be the properties that is inputted
         * 
         * with this users can enter their inputs.
         * 
         * NOTE: that name and value must match
         */
        setInputs((prevState) => ({
          ...prevState, 
          [e.target.name]: e.target.value, 
          //this is a promise
    
        }))
    
      }
    
      /**
       * Note that to prevent the default behaviour of the HTML, 
       * we use e.preventDefault(). 
       * This is because it will send the data to the URL and it will Refresh the page
       * 
       * REMEMBER TO LET the button type be submit, so that the form will be submmitted
       */
    
      const handleSubmit = (e) => {
          e.preventDefault()
          postUpdate(inputs, id)
            .then((data) => console.log(data))
            .catch(err => console.log(err))
      }
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
            { post && <form onSubmit={handleSubmit}>
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
                <TextField 
                  onChange={handleChange}
                  name="description"
                  value={inputs.description}
                  variant='standard' 
                  margin='normal'/>
    
                <FormLabel sx={{fontFamily: "quicksand"}} >Image URL</FormLabel>
                <TextField 
                  onChange={handleChange}
                  name="imageURL"
                  value={inputs.imageURL}
                  variant='standard' 
                  margin='normal'/>
    
    
                <FormLabel sx={{fontFamily: "quicksand"}} >Location</FormLabel>
                <TextField 
                  onChange={handleChange}
                  name="location"
                  value={inputs.location}
                  variant='standard' 
                  margin='normal'/>
    
                <Button 
                  type= "submit"
                  color="warning" 
                  sx={{width:"50%" ,margin:"auto",mt: 2, borderRadius:7}} 
                  variant="contained"
                >Post
                </Button>
    
              </Box>
            </form>}
        </Box>
      )
  
}

export default UpdateDiary