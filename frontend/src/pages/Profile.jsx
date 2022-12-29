import { Box, Typography, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { authActions } from '../features/auth/authSlice'
import DiaryItem from '../components/DiaryItem'
import { getUserDetails } from '../features/user/userService'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const [user, setUser] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    //remember need to .then and .catch bc this is asynchronous and returns a promise
    getUserDetails().then(data=>setUser(data.user)).catch(err=>console.log(err))
  }, [])

  const handleClick = () => {
    //
    dispatch(authActions.logout())
    localStorage.removeItem("userId")
    navigate('/');
    //force to change the url
  }

  return (
    <>
    <Box display="flex" flexDirection={'column'}>
      {user && <>
        <Typography textAlign={'center'} variant="h3" fontFamily={'quicksand'} padding={2}>
        User Profile 
      </Typography>

      <Typography fontFamily={'quicksand'} padding={1} textAlign="left">
        Name: {user.name}
      </Typography>
      <Typography fontFamily={'quicksand'} padding={1} textAlign="left">
        Email: {user.email}
      </Typography>
      <Button 
        onClick={handleClick}
        sx={{mr:'auto', width: '15%'}} 
        color = 'warning' 
        variant="contained"
      >
        Logout
      </Button>

      <Box 
        display="flex" 
        flexDirection={'column'} 
        justifyContent="center"
        alignItems={"center"}
      >
        {user.posts.map((post, index) => (
        <DiaryItem
          key={index}
          title= {post.title}
          date={post.date}
          description={post.description}
          id={post.id}
          image={post.image}
          location={post.location}
          user = {user._id}
        ></DiaryItem>))}
      </Box>
      
      </>}

    </Box>
    </>
  )
}

export default Profile