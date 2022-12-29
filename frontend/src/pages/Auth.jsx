import React from 'react'
import {Box, FormLabel, TextField, Typography, Button} from "@mui/material"
import { useState } from 'react'
import { sendAuthRequest } from '../features/posts/postService'
import {useDispatch} from 'react-redux'
import {authActions} from "../features/auth/authSlice"
import { useNavigate } from 'react-router-dom'

function Auth() {
  //dispatch the function from redux
  //useDispatch will allow us to dispatch an action
  const dispatch = useDispatch() //import the authActions so that we can dispatch it
  const navigate = useNavigate()
  const [isSignup, setisSignup] = useState(false)
  //note that the values of the inputs are in the values of the form 
  const [inputs, setInputs] = useState({
    name: "", 
    email:"", 
    password:""
  })

  const onResReceived = (data) => {
    //
    if(isSignup){
      localStorage.setItem("userId", data.user._id)
    } else{
      localStorage.setItem("userId", data.id)
    }

    dispatch(authActions.login())
    navigate('/')
  }
  
  const handleChange = (e) => {
    //we need to save the prev state also
    setInputs((prevState) => ({
      ...prevState, 
      [e.target.name] : e.target.value, 
    }))
  }
  const handleSubmit = (e) => {
    //need this to prevent the html page from switching to the default state
    e.preventDefault()
    console.log(inputs)

    if(isSignup){
      //we are sending the inputs object into the data(parameters of sendAuthRequest in postService)
      sendAuthRequest(true, inputs)
      //use the localstorage in the memory to store and keep track of the ID  
       .then(onResReceived)
        .catch(err=> console.log(err))
    }
    else{
      sendAuthRequest(false, inputs)
        //use the localstorage in the memory to store and keep track of the ID
        .then(onResReceived)
        .catch(err=>console.log(err))
    }
  }
  
  return (
    <Box 
      width="40%" 
      borderRadius={10}
      boxShadow={"5px 5px 10px #ccc"}
      margin = "auto"
      marginTop={10}
    > 
      <form onSubmit={handleSubmit}>
        <Box 
          display='flex' 
          flexDirection={'column'}
          width="60%"
          padding={5}
          margin="auto"
        >
          <Typography padding={1} variant='h4' textAlign="center">
            {isSignup ? "Signup": "Login"}
          </Typography>
          {isSignup && (
            <>
            <FormLabel>Name</FormLabel>
            <TextField 
              onChange={handleChange}
              value={inputs.name} 
              name="name" 
              required 
              margin='normal'
            />
            </>
          )}
          <FormLabel>Email</FormLabel>
          <TextField 
            onChange={handleChange}
            value={inputs.email} 
            name="email" 
            type="email"
            required 
            margin='normal'
          />
          <FormLabel>Password</FormLabel>
          <TextField 
            onChange={handleChange}
            value={inputs.password} 
            name="password" 
            type="password"
            required 
            margin='normal'
          />
          <Button sx={{mt: 2, borderRadius: 10}} type="submit" variant="contained">
            {isSignup ? "Signup": "Login"}
          </Button>
          <Button onClick={() => setisSignup(!isSignup)} sx={{mt: 2, borderRadius: 10}} variant="outlined">
            {isSignup? "Change to Login": "Change to Signup"}
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default Auth