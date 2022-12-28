import React from 'react'
import DiaryItem from '../components/DiaryItem'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { getAllPosts } from '../features/posts/postService'

function Dairies() {
    /**After getting the data, we need to store the data in the useState*/
    const [posts, setPosts] = useState()


    // we only need to render this once, so the dependency array is empty
    useEffect(() => {
      //this will return some promise data
      getAllPosts()
        .then((data) => setPosts(data?.posts)) //FROM here, now we have the array of the post
        .catch(err => console.log(err))
    }, [])
  /**
   * Use flexbox to align the items
   * 
   * This is to map and loop through 5 diary item
   * {[1,2,3,4,5].map((item) => <DiaryItem key={item} /> )} need to have key because of react stuff
   */

  return (
    <Box 
      display="flex" 
      flexDirection={'column'} 
      padding ={3} 
      justifyContent="center" 
      alignItems={"center"}
    > {posts && 
        posts.map((item, index) => (
          <DiaryItem 
            date={new Date(`${item.date}`).toLocaleDateString()} 
            description = {item.description}
            image = {item.image}
            id = {item._id}
            location = {item.location}
            title = {item.title}
            key={index} 
            user = {item.user}
          /> 
        ))}
    </Box>
  )
}

export default Dairies